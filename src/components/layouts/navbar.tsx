import React from "react";

import { Braces } from "lucide-react";

import { GITHUB_URL } from "@/constants/config";

import { buttonVariants } from "../ui/button";

const Navbar: React.FC = () => {
  return (
    <header className="bg-background sticky top-0 left-0 z-50 border-b">
      <nav className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <p className="py-3 text-center text-base font-bold sm:text-lg md:text-xl">
          Aldilla Ulinnja
        </p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            variant: "link",
          })}
        >
          <Braces /> Github
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
