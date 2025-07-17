import React from "react";

import { Button } from "../ui/button";

interface IErrorFetch {
  handleRetry?: () => void;
}

const ErrorFetch: React.FC<IErrorFetch> = ({ handleRetry }) => {
  return (
    <div
      data-testid="error-fetch"
      className="col-span-1 flex h-[50dvh] flex-col items-center justify-center sm:col-span-2"
    >
      <p className="text-5xl font-bold">Oops!</p>
      <p className="text-lg">Error fetching articles</p>
      {handleRetry && <Button onClick={handleRetry}>Try Again</Button>}
    </div>
  );
};

export default ErrorFetch;
