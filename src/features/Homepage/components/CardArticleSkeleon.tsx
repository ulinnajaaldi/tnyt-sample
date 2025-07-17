import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const CardArticleSkeleon: React.FC = () => {
  return (
    <div className="bg-muted flex animate-pulse flex-col gap-4 rounded-md border p-4">
      <Skeleton className="h-10 w-8/12" />
      <Skeleton className="mb-4 h-[260px] w-full sm:h-[300px] lg:h-[400px]" />
      <Skeleton className="h-10 w-4/12" />
    </div>
  );
};

export default CardArticleSkeleon;
