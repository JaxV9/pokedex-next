'use client';

import { useEffect, useState } from "react";

type PokemonSpeciesPropsType = {
    currentLangProps: string,
    pokemonProps: PokemonType | null
}

export const PokemonSpecies = ({ currentLangProps, pokemonProps }: PokemonSpeciesPropsType) => {

    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies[]>([])
    const [isSpecies, setIsSpecies] = useState<boolean>(true)
    const [pokemonSpeciesFiltered, setPokemonSpeciesFiltered] = useState<PokemonSpecies[]>([])
    const [currentSpecy, setCurrentSpecy] = useState<number>(0)

    function filterPokemonSpeciesByLanguage(languageName: string): PokemonSpecies[] {
        return pokemonSpecies.filter(species => species.language.name === languageName);
    }


    useEffect(() => {
        if (pokemonSpecies.length > 0) {
            setPokemonSpeciesFiltered(filterPokemonSpeciesByLanguage(currentLangProps))
        }
    }, [pokemonSpecies])

    const fetchPokemonSpecies = async (id: number) => {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            if (response.status === 404) {
                setIsSpecies(false)
            }
            let data = await response.json()
            setPokemonSpecies(data.flavor_text_entries)
        } catch {
            console.log("error")
        }
    }

    useEffect(() => {
        if (pokemonProps) {
            fetchPokemonSpecies(pokemonProps.id)
        }
    }, [pokemonProps])

    return (
        <>
            {
                isSpecies === true ?
                    <div>
                        <p id='pokemonLegendSpecies'>
                            {currentSpecy + 1}/{pokemonSpeciesFiltered.length}
                        </p>
                        {pokemonSpeciesFiltered.length > 0 ?
                            <div className='pokemonSpeciesTextContainer'>
                                <p>{String(pokemonSpeciesFiltered[currentSpecy].flavor_text)}</p>
                                <p id='pokemonLegendSpecies'>Version : {String(pokemonSpeciesFiltered[currentSpecy].version.name)}</p>
                            </div>
                            :
                            null
                        }
                        {pokemonSpeciesFiltered.length === 0 ?
                            <div className='pokemonSpeciesTextContainer'>
                                <p>...</p>
                                <p id='pokemonLegendSpecies'>Version : ...</p>
                            </div>
                            :
                            null
                        }
                        <div className='navSpeciesContainer'>
                            {currentSpecy > 0 ?
                                <div onClick={() => setCurrentSpecy(currentSpecy - 1)} className='arrowLeft'></div>
                                : null}
                            {currentSpecy + 1 !== pokemonSpeciesFiltered.length ?
                                <div onClick={() => setCurrentSpecy(currentSpecy + 1)} className='arrowRight'></div>
                                : null}
                        </div>
                    </div>
                    : null
            }
        </>
    )
}
