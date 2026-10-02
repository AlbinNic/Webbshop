import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StartPage } from "../pages/StartPage/StartPage";
import rawData from "../../db.json";

vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual<any>("@tanstack/react-query");
    return {
        ...actual,
        useQuery: vi.fn(),
    };
});

import { useQuery } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

const renderWithQuery = (ui: React.ReactNode) => {
    const client = new QueryClient();
    return render(
        <QueryClientProvider client={client}>
            {ui}
        </QueryClientProvider>
    );
};


describe("StartPage", () => {

    it("filtrerar produkter korrekt när en kategori väljs", async () => {
        (useQuery as any).mockReturnValue({
            isLoading: false,
            isError: false,
            data: rawData.products,
        });

        renderWithQuery(
            <MemoryRouter>
            <StartPage />
            </MemoryRouter>
        ); 

        const firstCategory = rawData.products[0].categories[0];

        fireEvent.click(screen.getByText(firstCategory));

        const expected = rawData.products.filter(p =>
            p.categories.includes(firstCategory)
        );

        const cards = screen.queryAllByTestId("product-card");
        expect(cards.length).toBe(expected.length);
    });

    it("uppdaterar grid när kategori ändras", () => {
        (useQuery as any).mockReturnValue({
            isLoading: false,
            isError: false,
            data: rawData.products,
        });
        renderWithQuery(
            <MemoryRouter>
            <StartPage />
            </MemoryRouter>
        ); 

        const before = screen.queryAllByTestId("product-card").length;

        fireEvent.click(screen.getByText("C3"));

        const after = screen.queryAllByTestId("product-card").length;

        expect(after).not.toBe(before);
    });

    it("återställer filtrering när 'Visa alla' klickas", () => {
        (useQuery as any).mockReturnValue({
            isLoading: false,
            isError: false,
            data: rawData.products,
        });
        renderWithQuery(  
            <MemoryRouter>
            <StartPage />
            </MemoryRouter>
        ); 

        fireEvent.click(screen.getByText("C4"));
        fireEvent.click(screen.getByText("Visa alla"));

        const cards = screen.queryAllByTestId("product-card");
        expect(cards.length).toBe(rawData.products.length);
    });
});