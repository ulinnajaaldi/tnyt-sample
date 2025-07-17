import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SearchBox from "../SearchBox";

const mockProps = {
  search: "",
  setSearch: vi.fn(),
  queryArticle: {
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  } as any,
  handleSubmit: vi.fn(),
};

describe("SearchBox", () => {
  it("should render search input and button", () => {
    render(<SearchBox {...mockProps} />);

    expect(
      screen.getByPlaceholderText("Search articles..."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });

  it("should call setSearch when input value changes", () => {
    render(<SearchBox {...mockProps} />);

    const input = screen.getByPlaceholderText("Search articles...");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(mockProps.setSearch).toHaveBeenCalledWith("test query");
  });

  it("should call handleSubmit when form is submitted", () => {
    render(<SearchBox {...mockProps} />);

    const form = screen.getByTestId("search-box-form");
    fireEvent.submit(form);

    expect(mockProps.handleSubmit).toHaveBeenCalled();
  });
});
