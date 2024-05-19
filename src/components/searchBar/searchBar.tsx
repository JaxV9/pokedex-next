'use client';

import { getLastElementFromUrl } from "@/utils/format";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type SearchBarPropsType = {
    toggleProps: any
}

export const SearchBar = ({ toggleProps }: SearchBarPropsType) => {

    const [pokemonNameList, setPokemonNameList] = useState<PokemonShortType[]>([])
    const [currentSearch, setCurrentSearch] = useState<string | null>(null)
    const [results, setResults] = useState<PokemonShortType[]>([])

    const fetchPokemonList = async (limit: number) => {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`, { cache: 'force-cache' })
            let data = await response.json()
            setPokemonNameList(data.results)
        } catch {
            console.log("error")
        }
    }

    const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSearch(e.target.value)
    }

    
    useEffect(() => {
        if (currentSearch !== null && currentSearch !== "") {
            const filteredResults = pokemonNameList.filter(pokemon => pokemon.name.includes(currentSearch.toLowerCase()));
            setResults(filteredResults);
        }
        if(currentSearch === "") {
            setResults([])
        }
    },[currentSearch, pokemonNameList])

    const autoFocusInput = useCallback((inputElement: any) => {
        if (inputElement) {
            inputElement.focus()
        }
    }, [])

    useEffect(() => {
        fetchPokemonList(10000)
    }, [])

    //Close searchbar when you taping escape or cliking out of the box
    const handleEscapePress = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            toggleProps();
        }
    }, [toggleProps]);
    
    useEffect(() => {
        document.addEventListener('keydown', handleEscapePress);
        return () => {
            document.removeEventListener('keydown', handleEscapePress);
        };
    }, [handleEscapePress]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const searchBarContainer = document.querySelector('.searchBarContainer');
            const navBarSearchButton = document.querySelector('.navBarSearchButton');
            if (searchBarContainer
                && !searchBarContainer.contains(event.target as Node)
                && navBarSearchButton
                && !navBarSearchButton.contains(event.target as Node)) {
                toggleProps();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggleProps]);

    return (
        <>
            <div className="searchBarContainer">
                <div onClick={toggleProps} className="closeSearchBarBtn"></div>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputValue(e)} ref={autoFocusInput} className="searchBarInput" type="text" />
                {currentSearch !== null ?
                    <div className={results.length > 0 ? "resultsSearchBar" : "resultsSearchBarHidden"}>
                        {results.length > 0 ?
                            results.map((pokemon, index) => (
                                <Link href={"/pokemon-library/" + pokemon.name} onClick={toggleProps}>
                                    <div className="pokemonSearch" key={index}>
                                        <div className="pokemonSearchImage">
                                            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + [getLastElementFromUrl(pokemon.url)] + ".png"} alt="" /> 
                                        </div>
                                        <div className="pokemonSearchText">
                                            <p>{pokemon.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                            : null}
                    </div>
                    : null}
            </div>
        </>
    )
}
