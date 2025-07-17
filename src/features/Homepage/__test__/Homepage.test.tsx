import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ArticleServices } from "@/services/Article";

import HomepageFeature from "../index";

vi.mock("../components", () => ({
  SearchBox: ({ search, setSearch, handleSubmit, queryArticle }: any) => (
    <form onSubmit={handleSubmit}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search articles..."
        disabled={queryArticle?.isLoading || queryArticle?.isError}
      />
      <button
        type="submit"
        disabled={queryArticle?.isLoading || queryArticle?.isError}
      >
        Search
      </button>
    </form>
  ),
  CardArticle: ({ article }: any) => (
    <div data-testid="article-card">
      <h3>{article.headline.main}</h3>
      <p>{article.abstract}</p>
    </div>
  ),
  CardArticleSkeleon: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock("@/components/layouts/error-fetch", () => ({
  default: ({ handleRetry }: any) => (
    <div data-testid="error-fetch">
      <p>Error occurred</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  ),
}));

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

describe("HomepageFeature", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render homepage with initial state", () => {
    render(<HomepageFeature />, { wrapper: createWrapper() });

    expect(
      screen.getByText("The New York Times API Sample"),
    ).toBeInTheDocument();
    expect(screen.getByText(/rate limit of/)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search articles..."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("should update search input when typing", () => {
    render(<HomepageFeature />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText("Search articles...");
    fireEvent.change(input, { target: { value: "test search" } });

    expect(input).toHaveValue("test search");
  });

  it("should show loading skeletons when searching", async () => {
    vi.mocked(ArticleServices.getSearchArticle).mockImplementation(
      () => new Promise(() => {}), // Never resolves to keep loading state
    );

    render(<HomepageFeature />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText("Search articles...");
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getAllByTestId("skeleton")).toHaveLength(4);
    });
  });

  it("should display articles when search is successful", async () => {
    const mockData = {
      status: "OK",
      copyright: "Copyright (c) 2024 The New York Times Company.",
      response: {
        docs: [
          {
            _id: "1",
            headline: { main: "Test Article 1" },
            abstract: "Test abstract 1",
            byline: { original: "By Author 1" },
            pub_date: "2024-01-01T00:00:00Z",
            web_url: "https://example.com/1",
            multimedia: { default: { url: "" }, credit: "" },
          },
          {
            _id: "2",
            headline: { main: "Test Article 2" },
            abstract: "Test abstract 2",
            byline: { original: "By Author 2" },
            pub_date: "2024-01-02T00:00:00Z",
            web_url: "https://example.com/2",
            multimedia: { default: { url: "" }, credit: "" },
          },
        ],
        metadata: { hits: 2, offset: 0, time: 100 },
      },
    };

    // @ts-ignore
    vi.mocked(ArticleServices.getSearchArticle).mockResolvedValue(mockData);

    render(<HomepageFeature />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText("Search articles...");
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getAllByTestId("article-card")).toHaveLength(2);
      expect(screen.getByText("Test Article 1")).toBeInTheDocument();
      expect(screen.getByText("Test Article 2")).toBeInTheDocument();
    });
  });

  it("should show error state when API call fails", async () => {
    const mockError = new Error("API Error");
    vi.mocked(ArticleServices.getSearchArticle).mockRejectedValue(mockError);

    render(<HomepageFeature />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText("Search articles...");
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId("error-fetch")).toBeInTheDocument();
      expect(screen.getByText("Error occurred")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });
  });

  it("should disable for input search when fetch isLoading or isError articles", async () => {
    vi.mocked(ArticleServices.getSearchArticle).mockImplementation(
      () => new Promise(() => {}), // Never resolves to keep loading state
    );

    render(<HomepageFeature />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText("Search articles...");
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(input).toBeDisabled();
      expect(searchButton).toBeDisabled();
    });
  });
});
