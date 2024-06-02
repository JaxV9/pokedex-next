'use client';
import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "../navbar/navbar";
import Link from "next/link";
import SearchContext from "@/contexts/searchContext";
import PokeTypesColorContext, { pokeTypesColor } from "@/contexts/pokeTypesColor";
import { pokeTypesColorInit } from "@/data/pokeTypesColor";

type LayoutChildrenContainer = {
  children: ReactNode
}

export const LayoutChildrenContainer = ({ children }: LayoutChildrenContainer) => {
  const [navBarEnabled, setNavBarEnabled] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [pokeTypesColorData, setPokeTypesColorData] = useState<pokeTypesColor[]>(pokeTypesColorInit)

  return (
    <PokeTypesColorContext.Provider value={pokeTypesColorData}>
      <SearchContext.Provider value={{ isSearching, setIsSearching }}>
        <div className={navBarEnabled ? "layoutChildrenContainerNavEnabled" : "layoutChildrenContainerNavDisabled"}>
          <Navbar navBarEnabledProps={navBarEnabled} setNavBarEnabledProps={setNavBarEnabled} />
          <Link href="/">
            <img className="logoLayout" src="/assets/Pokedex-Next-logo.png" />
          </Link>
          {children}
        </div>
      </SearchContext.Provider>
    </PokeTypesColorContext.Provider>
  );
}