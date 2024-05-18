'use client';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';


export default function PokemonSheet() {

    const { slug } = useParams() as { slug: string }
    const [pokemon, setPokemon] = useState<PokemonType | null>(null)
    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies[]>([])
    const [pokemonSpeciesFiltered, setPokemonSpeciesFiltered] = useState<PokemonSpecies[]>([])
    const [currentSpecy, setCurrentSpecy] = useState<number>(0)
    const [currentLang, setCurrentLang] = useState<string>("en")


    const fetchPokemon = async () => {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`, { cache: 'force-cache' })
            let data = await response.json()
            setPokemon(data);
        } catch {
            console.log("error")
        }
    }

    const fetchPokemonSpecies = async (id: number) => {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            let data = await response.json()
            setPokemonSpecies(data.flavor_text_entries)
        } catch {
            console.log("error")
        }
    }
    function filterPokemonSpeciesByLanguage(languageName: string): PokemonSpecies[] {
        return pokemonSpecies.filter(species => species.language.name === languageName);
    }


    useEffect(() => {
        fetchPokemon()
    }, [])

    useEffect(() => {
        if (pokemon) {
            fetchPokemonSpecies(pokemon.id)
        }
    }, [pokemon])
    useEffect(() => {
        if (pokemonSpecies.length > 0) {
            setPokemonSpeciesFiltered(filterPokemonSpeciesByLanguage(currentLang))
        }
    }, [pokemonSpecies])

    useEffect(() => {
        if (pokemonSpeciesFiltered.length > 0) {
            console.log(pokemonSpeciesFiltered)
        }
    }, [pokemonSpeciesFiltered])

    return (
        <>
            {pokemon ?
                <section className='pokemonInfoContainer'>
                    <div className='pokemonInfoHeroContainer'>
                        <div className='pokemonNameAndPictureContainer'>
                            <h1>{pokemon.name}</h1>
                            <img className="pokemonPicture" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
                        </div>
                        <div className='pokemonSpeciesContainer'>
                            <p id='pokemonLegendSpecies'>
                                {currentSpecy + 1}/{pokemonSpeciesFiltered.length}
                            </p>
                            {pokemonSpeciesFiltered.length > 0 ?
                                <div className='pokemonSpeciesTextContainer'>
                                    <p>{String(pokemonSpeciesFiltered[currentSpecy].flavor_text)}</p>
                                    <p id='pokemonLegendSpecies'>Version : {String(pokemonSpeciesFiltered[currentSpecy].version.name)}</p>
                                </div>
                                :
                                <div className='pokemonSpeciesTextContainer'>
                                    <p>...</p>
                                    <p id='pokemonLegendSpecies'>Version : ...</p>
                                </div>
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
                    </div>

                </section>
                : null}
        </>
    )
}