import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StartPage } from "../pages/StartPage/StartPage";
import rawData from "../../db.json";
import { useQuery } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual<any>("@tanstack/react-query");
    return {
        ...actual,
        useQuery: vi.fn(),
    };
});

describe("StartPage", () => {
    const mockOnAddToCart = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (useQuery as any).mockImplementation((options: any) => {
            const keys = options.queryKey || [];

            if (keys.includes('categories')) {
                return { isLoading: false, isError: false, data: ["C1", "C2", "C3", "C4", "C5"] };
            }

            if (keys.includes('cart') || keys.includes('shoppingcart')) {
                return { isLoading: false, isError: false, data: [] };
            }

            const activeCategory = keys.find((key: string) => 
                ["C1", "C2", "C3", "C4", "C5"].includes(key)
            );

            if (activeCategory) {
                const filtered = rawData.products.filter(p => p.categories.includes(activeCategory));
                return { isLoading: false, isError: false, data: filtered };
            }

            return { isLoading: false, isError: false, data: rawData.products };
        });
    });

    afterEach(() => {
        cleanup();
    });

    const renderTestComponent = () => {
        const client = new QueryClient({
            defaultOptions: {
                queries: { retry: false, gcTime: 0 }
            }
        });
        return render(
            <QueryClientProvider client={client}>
                <MemoryRouter>
                    <StartPage onAddToCart={mockOnAddToCart} />
                </MemoryRouter>
            </QueryClientProvider>
        );
    };

    it("filtrerar produkter korrekt när en kategori väljs", async () => {
        renderTestComponent();

        const firstCategory = rawData.products[0].categories[0];
        
        const element = screen.getAllByText(new RegExp(firstCategory, "i"))[0];
        fireEvent.click(element);

        const expected = rawData.products.filter(p => p.categories.includes(firstCategory));

        await waitFor(() => {
            const cards = screen.queryAllByTestId("product-card");
            expect(cards.length).toBe(expected.length);
        });
    });

    it("uppdaterar grid när kategori ändras", async () => {
        renderTestComponent();

        const before = screen.queryAllByTestId("product-card").length;

        const element = screen.getAllByText(/C3/i)[0];
        fireEvent.click(element);

        await waitFor(() => {
            const cards = screen.queryAllByTestId("product-card");
            expect(cards.length).not.toBe(before);
        });
    });

    it("återställer filtrering när 'Visa alla' klickas", async () => {
        renderTestComponent();

        const c4Element = screen.getAllByText(/C4/i)[0];
        fireEvent.click(c4Element);

        const allElement = screen.getAllByText(/Visa alla/i)[0];
        fireEvent.click(allElement);

        await waitFor(() => {
            const cards = screen.queryAllByTestId("product-card");
            expect(cards.length).toBe(rawData.products.length);
        });
    });
});
