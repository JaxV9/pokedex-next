'use client';
import { PokemonSpecies } from '@/components/pokemonSpecies/pokemonSpecies';
import { Stats } from '@/components/stats/stats';
import { StatsType } from '@/model/stats';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';


export default function PokemonSheet() {

    const { slug } = useParams() as { slug: string }
    const [pokemon, setPokemon] = useState<PokemonDatas | null>(null)
    const [stats, setStats] = useState<StatsType[]>([])
    const [currentLang, setCurrentLang] = useState<string>("en")

    const [currentNav, setCurrentNav] = useState<string>("about")


    const fetchPokemon = async () => {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`, { cache: 'force-cache' })
            let data = await response.json()
            setStats(data.stats)
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
                            <div>
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
                        <div className='pokemonDatasContainer'>
                            <div className='navPokemonContainer'>
                                <span className={currentNav === "about" ? "navPokemon focusNav" : "navPokemon"}
                                    onClick={() => setCurrentNav("about")}>About</span>
                                <span className={currentNav === "evolution" ? "navPokemon focusNav" : "navPokemon"}
                                    onClick={() => setCurrentNav("evolution")}>Evolutions</span>
                                <span className={currentNav === "stats" ? "navPokemon focusNav" : "navPokemon"}
                                    onClick={() => setCurrentNav("stats")}>Stats</span>
                                <span className={currentNav === "moves" ? "navPokemon focusNav" : "navPokemon"}
                                    onClick={() => setCurrentNav("moves")}>Moves</span>
                            </div>
                            {
                                currentNav === "about" ?
                                    <PokemonSpecies currentLangProps={currentLang} pokemonProps={pokemon} />
                                    :
                                    null
                            }
                                                        {
                                currentNav === "stats" ?
                                    <Stats statsProps={stats}/>
                                    :
                                    null
                            }


                            {/* <div className='pokemonStatsContainer'>
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
                            </div> */}
                        </div>
                    </div>
                </section>
                : null}
        </>
    )
}