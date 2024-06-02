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

    const navArrowLess = () => {
        if (currentSpecy > 0) {
            setCurrentSpecy(currentSpecy - 1)
        }
        if (currentSpecy === 0) {
            setCurrentSpecy(pokemonSpeciesFiltered.length - 1)
        }
    }

    const navArrowMore = () => {
        if (currentSpecy + 1 !== pokemonSpeciesFiltered.length) {
            setCurrentSpecy(currentSpecy + 1)
        }
        if (currentSpecy + 1 === pokemonSpeciesFiltered.length) {
            setCurrentSpecy(0)
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
                        {pokemonSpeciesFiltered.length > 0 ?
                            <div className='pokemonSpeciesTextContainer'>
                                <p>{String(pokemonSpeciesFiltered[currentSpecy].flavor_text)}</p>

                                <div className='navSpeciesContainer'>
                                    <p id='pokemonLegendSpecies'>{currentSpecy + 1}/{pokemonSpeciesFiltered.length} - Version : {String(pokemonSpeciesFiltered[currentSpecy].version.name)}</p>
                                    <div onClick={navArrowLess} className='arrowLeft'></div>
                                    <div onClick={navArrowMore} className='arrowRight'></div>
                                </div>
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

                    </div>
                    : null
            }
        </>
    )
}
