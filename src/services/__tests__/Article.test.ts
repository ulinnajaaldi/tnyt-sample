import { beforeEach, describe, expect, it, vi } from "vitest";

import { ArticleServices } from "../Article";

global.fetch = vi.fn();

describe("ArticleServices", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch search articles successfully", async () => {
    const mockResponse = {
      response: {
        docs: [
          {
            _id: "1",
            headline: { main: "Test Article" },
            abstract: "Test abstract",
          },
        ],
      },
    };

    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const result = await ArticleServices.getSearchArticle({ search: "test" });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("articlesearch.json?q=test"),
    );
    expect(result).toEqual(mockResponse);
  });
});
