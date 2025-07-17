import { useQuery } from "@tanstack/react-query";

import { ArticleServices } from "@/services/Article";

const useGetSearchArticle = ({ search }: { search: string }) => {
  const query = useQuery({
    queryKey: ["articlesearch", { search }],
    queryFn: () => ArticleServices.getSearchArticle({ search }),
  });

  return query;
};

export default useGetSearchArticle;
