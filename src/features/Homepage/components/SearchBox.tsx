import React from "react";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useGetSearchArticle } from "@/useCases/Article";

interface ISearchBox {
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  queryArticle: ReturnType<typeof useGetSearchArticle>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBox: React.FC<ISearchBox> = (props) => {
  const { search, handleSearchChange, queryArticle, handleSubmit } = props;

  return (
    <form
      data-testid="search-box-form"
      onSubmit={handleSubmit}
      className="relative mx-auto flex w-full max-w-md"
    >
      <Input
        id="search"
        type="search"
        placeholder="Search articles..."
        value={search}
        onChange={handleSearchChange}
        className="pe-10"
        disabled={queryArticle.isLoading || queryArticle.isError}
      />
      <div className="absolute top-0 right-0">
        <Button
          data-testid="search-button"
          type="submit"
          variant="ghost"
          size="icon"
          disabled={queryArticle.isLoading || queryArticle.isError}
        >
          <Search />
        </Button>
      </div>
    </form>
  );
};

export default SearchBox;
