import React, { useState } from "react";

import ErrorFetch from "@/components/layouts/error-fetch";

import { useGetSearchArticle } from "@/useCases/Article";

import { CardArticle, CardArticleSkeleon, SearchBox } from "./components";

const HomepageFeature: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const queryArticle = useGetSearchArticle({
    search: value,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setValue(search);
  };

  return (
    <main className="container mx-auto my-5 px-4">
      <section className="mb-10 flex flex-col gap-2 text-center">
        <h1 className="text-lg font-bold md:text-2xl lg:text-3xl">
          The New York Times API Sample
        </h1>
        <p className="text-sm md:text-base">
          Please note that the New York Times API has a rate limit of{" "}
          <strong>5 request per minutes or 12 requests per second</strong>. If
          you encounter errors while searching, it's likely due to this API
          limitation. Please wait a moment before making additional requests.
        </p>
      </section>
      <section className="flex flex-col gap-5">
        <SearchBox
          search={search}
          setSearch={setSearch}
          queryArticle={queryArticle}
          handleSubmit={handleSubmit}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {queryArticle.isError ? (
            <ErrorFetch handleRetry={queryArticle.refetch} />
          ) : queryArticle.isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardArticleSkeleon key={index} />
            ))
          ) : (
            queryArticle.data?.response.docs.map((article) => (
              <CardArticle key={article._id} article={article} />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default HomepageFeature;
