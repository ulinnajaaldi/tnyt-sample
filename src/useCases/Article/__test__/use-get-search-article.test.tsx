import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ArticleServices } from "@/services/Article";

import useGetSearchArticle from "../use-get-search-article";

vi.mock("@/services/Article", () => ({
  ArticleServices: {
    getSearchArticle: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGetSearchArticle", () => {
  it("should fetch articles when search is provided", async () => {
    const mockData = {
      status: "OK",
      copyright:
        "Copyright (c) 2024 The New York Times Company. All Rights Reserved.",
      response: {
        docs: [],
        metadata: {
          hits: 0,
          offset: 0,
          time: 0,
        },
      },
    };
    vi.mocked(ArticleServices.getSearchArticle).mockResolvedValue(mockData);

    const { result } = renderHook(
      () => useGetSearchArticle({ search: "test" }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(ArticleServices.getSearchArticle).toHaveBeenCalledWith({
      search: "test",
    });
    expect(result.current.data).toEqual(mockData);
  });

  it("should handle error when API call fails", async () => {
    const mockError = new Error("Failed to fetch articles");
    vi.mocked(ArticleServices.getSearchArticle).mockRejectedValue(mockError);

    const { result } = renderHook(
      () => useGetSearchArticle({ search: "test" }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(ArticleServices.getSearchArticle).toHaveBeenCalledWith({
      search: "test",
    });
    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });
});
