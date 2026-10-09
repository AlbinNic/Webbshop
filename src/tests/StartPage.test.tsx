import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { StartPage } from "../pages/StartPage/StartPage";
import rawData from "../../db.json";

vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual<typeof import("@tanstack/react-query")>(
        "@tanstack/react-query"
    );
    return {
        ...actual,
        useQuery: vi.fn(),
    };
});

function mockProducts() {
    vi.mocked(useQuery).mockReturnValue({
        isLoading: false,
        isError: false,
        data: rawData.products,
    } as unknown as UseQueryResult);
}

function renderPage(ui: ReactNode) {
    const client = new QueryClient();
    return render(
        <QueryClientProvider client={client}>
            <MemoryRouter>{ui}</MemoryRouter>
        </QueryClientProvider>
    );
}

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

describe("StartPage", () => {
    it("filtrerar produkter korrekt när en kategori väljs", () => {
        mockProducts();
        renderPage(<StartPage onAddToCart={vi.fn()} />);

        const firstCategory = rawData.products[0].categories[0];
        fireEvent.click(screen.getByText(firstCategory));

        const expected = rawData.products.filter((p) =>
            p.categories.includes(firstCategory)
        );

        expect(screen.queryAllByTestId("product-card").length).toBe(expected.length);
    });

    it("uppdaterar grid när kategori ändras", () => {
        mockProducts();
        renderPage(<StartPage onAddToCart={vi.fn()} />);

        const before = screen.queryAllByTestId("product-card").length;

        fireEvent.click(screen.getByText("C3"));

        const after = screen.queryAllByTestId("product-card").length;
        expect(after).not.toBe(before);
    });

    it("återställer filtrering när 'Visa alla' klickas", () => {
        mockProducts();
        renderPage(<StartPage onAddToCart={vi.fn()} />);

        fireEvent.click(screen.getByText("C4"));
        fireEvent.click(screen.getByText("Visa alla"));

        expect(screen.queryAllByTestId("product-card").length).toBe(
            rawData.products.length
        );
    });
});