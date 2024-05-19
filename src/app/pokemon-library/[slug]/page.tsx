'use client';
import { PokemonSpecies } from '@/components/pokemonSpecies/pokemonSpecies';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';


export default function PokemonSheet() {

    const { slug } = useParams() as { slug: string }
    const [pokemon, setPokemon] = useState<PokemonDatas | null>(null)
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

    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <>
            {pokemon ?
                <section className='pokemonInfoContainer'>
                    <div className='pokemonInfoHeroContainer'>
                        <div className='pokemonNameAndPictureContainer'>
                            <h1>{pokemon.name}</h1>
                            <img className="pokemonPicture" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
                        </div>
                        <div className='pokemonDatasContainer'>
                            <PokemonSpecies currentLangProps={currentLang} pokemonProps={pokemon} />
                            <div className='pokemonStatsContainer'>
                                <p>Height : {pokemon.height / 10}m</p>
                                <p>Weight : {pokemon.weight / 10}kg</p>
                                <div>
                                    <p>Type :</p>
                                    <div className='pokemonTypesContainer'>
                                        {pokemon.types.length > 0 ?
                                            pokemon.types.map((type, index) => (
                                                <div className='pokemonTypeTag' key={index}>
                                                    <p>{type.type.name}</p>
                                                </div>
                                            ))
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : null}
        </>
    )
}