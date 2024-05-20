'use client';
import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "../navbar/navbar";
import Link from "next/link";
import SearchContext from "@/contexts/searchContext";

type LayoutChildrenContainer = {
  children: ReactNode
}

export const LayoutChildrenContainer = ({ children }: LayoutChildrenContainer) => {
  const [navBarEnabled, setNavBarEnabled] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <SearchContext.Provider value={{ isSearching, setIsSearching }}>
      <div className={navBarEnabled ? "layoutChildrenContainerNavEnabled" : "layoutChildrenContainerNavDisabled"}>
        <Navbar navBarEnabledProps={navBarEnabled} setNavBarEnabledProps={setNavBarEnabled} />
        <Link href="/">
          <img className="logoLayout" src="/assets/Pokedex-Next-logo.png" />
        </Link>
        {children}
      </div>
    </SearchContext.Provider>
  );
}