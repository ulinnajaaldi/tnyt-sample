import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import SearchBox from "../SearchBox";

describe("SearchBox", () => {
  let mockProps: any;

  beforeEach(() => {
    mockProps = {
      search: "",
      handleSearchChange: vi.fn(),
      queryArticle: {
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      },
      handleSubmit: vi.fn(),
    };
  });

  it("should render search input and button", () => {
    render(<SearchBox {...mockProps} />);

    expect(
      screen.getByPlaceholderText("Search articles..."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });

  it("should call handleSearchChange when input value changes", () => {
    render(<SearchBox {...mockProps} />);

    const input = screen.getByPlaceholderText("Search articles...");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(mockProps.handleSearchChange).toHaveBeenCalled();
  });

  it("should call handleSubmit when form is submitted", () => {
    render(<SearchBox {...mockProps} />);

    const form = screen.getByTestId("search-box-form");
    fireEvent.submit(form);

    expect(mockProps.handleSubmit).toHaveBeenCalled();
  });
});
