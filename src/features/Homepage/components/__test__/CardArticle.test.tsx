import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Doc } from "@/domains/SearchArticle";

import CardArticle from "../CardArticle";

const mockArticle: Doc = {
  _id: "1",
  headline: {
    main: "Test Headline",
    kicker: "",
    print_headline: "",
  },
  abstract: "Test abstract content",
  byline: { original: "By Test Author" },
  pub_date: "2024-01-01T00:00:00Z",
  web_url: "https://example.com/article",
  multimedia: {
    default: {
      url: "https://example.com/image.jpg",
      height: 0,
      width: 0,
    },
    credit: "Test Credit",
    caption: "Test caption",
    thumbnail: {
      height: 0,
      width: 0,
      url: "https://example.com/thumbnail.jpg",
    },
  },
  document_type: "",
  keywords: [],
  news_desk: "",
  print_page: "",
  print_section: "",
  section_name: "",
  snippet: "",
  source: "",
  subsection_name: "",
  type_of_material: "",
  uri: "",
  word_count: 0,
};

describe("CardArticle", () => {
  it("should render article information correctly", () => {
    render(<CardArticle article={mockArticle} />);

    expect(screen.getByText("Test Headline")).toBeInTheDocument();
    expect(screen.getByText("Test abstract content")).toBeInTheDocument();
    expect(screen.getByText("By Test Author")).toBeInTheDocument();
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("should render placeholder image when no multimedia URL", () => {
    const articleWithoutImage = {
      ...mockArticle,
      multimedia: {
        default: { url: "", height: 0, width: 0 },
        credit: "",
        caption: "",
        thumbnail: {
          url: "",
          height: 0,
          width: 0,
        },
      },
    };

    render(<CardArticle article={articleWithoutImage} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("placehold.co"),
    );
  });
});
