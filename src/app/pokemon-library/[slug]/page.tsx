'use client';
import { Evolution } from '@/components/evolution/evolution';
import { PokemonSpecies } from '@/components/pokemonSpecies/pokemonSpecies';
import { Stats } from '@/components/stats/stats';
import { StatsType } from '@/model/stats';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react';
import PokeTypesColorContext from '@/contexts/pokeTypesColor';
import { Move } from '@/components/move/move';
import { MovesType } from '@/model/moves';


export default function PokemonSheet() {

    const { slug } = useParams() as { slug: string }
    const pokeTypesColor = React.useContext(PokeTypesColorContext);

    const [pokemon, setPokemon] = useState<PokemonDatas | null>(null)
    const [stats, setStats] = useState<StatsType[]>([])
    const [moves, setMoves] = useState<MovesType[]>([])
    const [evolutionUrl, setEvolutionUrl] = useState<string>("")
    const [currentLang, setCurrentLang] = useState<string>("en")
    const [currentNav, setCurrentNav] = useState<string>("stats")
    const [is3d, setIs3d] = useState<boolean>(false)
    const [currentColor, setCurrentColor] = useState<string | undefined>(undefined)


    const fetchPokemon = async () => {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`, { cache: 'force-cache' })
            let data = await response.json()
            setStats(data.stats)
            setPokemon(data);
            setMoves(data.moves)
        } catch {
            console.log("error")
        }
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    useEffect(() => {
        const type = pokemon?.types[0]
        const typeColor = pokeTypesColor.find(colorType => colorType.type === type?.type.name);
        setCurrentColor(typeColor?.background)
    }, [pokemon?.types])


    return (
        <>
            {pokemon ?
                <section className='pokemonInfoContainer'>
                    <div className='pokemonInfoHeroContainer'>
                        <div className='pokemonNameAndPictureContainer'>
                            <h1>{pokemon.name}</h1>
                            <div onClick={() => (setIs3d(!is3d))} className={is3d ? 'threeDBtnContainerFocus' : 'threeDBtnContainer'}>
                                <div className='threeDBtn'></div>
                            </div>
                            <img className={is3d ? "pokemonPicture3d" : "pokemonPicture"}
                                src={is3d ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`
                                    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
                            <div>
                                <div className='pokemonTypesContainer'>
                                    {pokemon.types.length > 0 ?
                                        pokemon.types.map((type, index) => {
                                            const typeColor = pokeTypesColor.find(colorType => colorType.type === type.type.name);
                                            const backgroundColor = typeColor?.background || 'red';
                                            const textColor = typeColor?.text || 'black';
                                            return (
                                                <div className='pokemonTypeTag' key={index} style={{ backgroundColor: backgroundColor, color: textColor }}>
                                                    <p>{type.type.name}</p>
                                                </div>
                                            )
                                        })
                                        : null}
                                </div>
                            </div>
                        </div>
                        <div className='pokemonDatasContainer'>
                            <PokemonSpecies currentLangProps={currentLang} pokemonProps={pokemon} setEvolutionUrlProps={setEvolutionUrl}/>
                            <div className='navPokemonContainer'>
                            <span className={currentNav === "stats" ? "navPokemon focusNav" : "navPokemon"}
                                    onClick={() => setCurrentNav("stats")}>Stats</span>
                                <span className={currentNav === "evolution" ? "navPokemon focusNav" : "navPokemon"}
                                    onClick={() => setCurrentNav("evolution")}>Evolutions</span>
                                <span className={currentNav === "moves" ? "navPokemon focusNav" : "navPokemon"}
                                    onClick={() => setCurrentNav("moves")}>Moves</span>
                            </div>
                            {
                                currentNav === "evolution" ?
                                    <Evolution currentLangProps={currentLang} pokemonProps={pokemon} evolutionUrlProps={evolutionUrl}/>
                                    :
                                    null
                            }
                            {
                                currentNav === "stats" ?
                                    <Stats statsProps={stats} currentColorProps={currentColor} />
                                    :
                                    null
                            }
                            {
                                currentNav === "moves" ?
                                <Move movesProps={moves}/> // Update the prop name from 'movesProps' to 'moves'
                                :
                                null
                            }
                        </div>
                    </div>
                </section>
                : null}
        </>
    )
}