import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/layouts/navbar";
import HomepageFeature from "./features/Homepage";

const queryClient = new QueryClient({});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-serif">
        <Navbar />
        <HomepageFeature />
      </div>
    </QueryClientProvider>
  );
};

export default App;
