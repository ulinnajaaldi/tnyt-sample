import React from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Doc } from "@/domains/SearchArticle";

import { cn } from "@/lib/utils";

interface ICardArticle {
  article: Doc;
}

const CardArticle: React.FC<ICardArticle> = ({ article }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="lg:text-2xl">{article.headline.main}</CardTitle>
        <CardDescription>{article.abstract}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${article.multimedia.default.url || "https://placehold.co/600x400?text=Placeholder"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(24px)",
              zIndex: 1,
            }}
          />
          <img
            src={
              article.multimedia.default.url ||
              "https://placehold.co/600x400?text=Placeholder"
            }
            alt={`${article.headline.main}-${article.multimedia.credit}`}
            className="relative z-10 h-[260px] w-full object-contain sm:h-[300px] lg:h-[400px]"
          />
        </div>
        <p className="text-muted-foreground flex items-center justify-between text-sm">
          <span>{article.byline.original}</span>
          {article.pub_date && (
            <span className="shrink-0">
              {new Date(article.pub_date).toLocaleDateString("en-En", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </p>
        <a
          href={article.web_url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "link" }), "w-fit px-0")}
        >
          Read more
        </a>
      </CardContent>
    </Card>
  );
};

export default CardArticle;
