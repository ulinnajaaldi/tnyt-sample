import { API_KEY, BASE_URL } from "@/constants/config";

import type { ISearchArticle } from "@/domains/SearchArticle";

const getSearchArticle = async ({ search }: { search: string }) => {
  const response = await fetch(
    `${BASE_URL}/articlesearch.json?q=${search}&api-key=${API_KEY}`,
  );
  const results = await response.json();
  return results as ISearchArticle;
};

export const ArticleServices = {
  getSearchArticle,
};
