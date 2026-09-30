import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";


vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-query");
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

import { useQuery } from "@tanstack/react-query";

const renderWithQuery = (ui: React.ReactNode) => {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>
      {ui}
    </QueryClientProvider>
  );
};

describe("ProductDetailPage", () => {
  it("visar loading", () => {
    (useQuery as any).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    renderWithQuery(<ProductDetailPage />);
    expect(screen.getByText(/loading/i)).toBeTruthy();
  });

  it("visar error", () => {
    (useQuery as any).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    renderWithQuery(<ProductDetailPage />);
    expect(screen.getByText(/error loading product/i)).toBeTruthy();
  });

  it("visar produktdata", () => {
    (useQuery as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        id: 1,
        title: "Testprodukt",
        price: 100,
      },
    });

    renderWithQuery(<ProductDetailPage />);
    expect(screen.getByText("Testprodukt")).toBeTruthy();
  });
});