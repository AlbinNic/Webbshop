import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";

vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual<typeof import("@tanstack/react-query")>(
        "@tanstack/react-query"
    );
    return {
        ...actual,
        useQuery: vi.fn(),
    };
});

function mockQuery(result: { isLoading: boolean; isError: boolean; data: unknown }) {
    vi.mocked(useQuery).mockReturnValue(result as unknown as UseQueryResult);
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

describe("ProductDetailPage", () => {
    it("visar loading", () => {
        mockQuery({ isLoading: true, isError: false, data: null });

        renderPage(<ProductDetailPage onAddToCart={vi.fn()} />);
        expect(screen.getByText(/loading/i)).toBeTruthy();
    });

    it("visar error", () => {
        mockQuery({ isLoading: false, isError: true, data: null });

        renderPage(<ProductDetailPage onAddToCart={vi.fn()} />);
        expect(screen.getByText(/error loading product/i)).toBeTruthy();
    });

    it("visar produktdata", () => {
        mockQuery({
            isLoading: false,
            isError: false,
            data: { id: 1, title: "Testprodukt", price: 100 },
        });

        renderPage(<ProductDetailPage onAddToCart={vi.fn()} />);
        expect(screen.getByText("Testprodukt")).toBeTruthy();
    });

    it("kraschar inte om description saknas", () => {
        mockQuery({
            isLoading: false,
            isError: false,
            data: { id: 1, title: "Testprodukt", price: 100 },
        });

        renderPage(<ProductDetailPage onAddToCart={vi.fn()} />);
        expect(screen.getByText("Testprodukt")).toBeTruthy();
    });
});