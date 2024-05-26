'use client';
import SearchContext from "@/contexts/searchContext";
import Link from "next/link"
import React, { useContext } from 'react';


export default function Home() {
  const { isSearching, setIsSearching } = useContext(SearchContext)!;

  const mentionEn = "Website created and maintained by LAYAN Jason"

  const toggleSearchBar = () => {
    setIsSearching(!isSearching);
  };

  return (
    <main>
      <section className="heroHome">
        <div className="blurHeroHome">
          <div className="contentHeroHomeContainer">
            <h1 className="titleHeroHome">The future of pokémon encyclopedia</h1>
            <div className="buttonsHomeHeroContainer">
              <button onClick={toggleSearchBar} id="homeSearchBtn" className="homeBtn">Search a pokemon</button>
              <Link href={"/pokemon-library"}>
                <button className="homeBtn">View the library</button>
              </Link>
            </div>
          </div>
          <div className="mentionHome">
            <Link href="https://www.linkedin.com/in/layan-jason-developpeur/">
              {mentionEn}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
