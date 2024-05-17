'use client';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LoadMoreBtn } from "../ui/buttons/loadMoreBtn/loadMoreBtn";


export const PokemonList = () => {

    const [pokemonList, setPokemonList] = useState<PokemonType[]>([])
    const [limitLenghtPokemon, setLimitLenghtPokemon] = useState<number>(50)
    const [currentNbPokemon, setCurrentNbPokemon] = useState<number>(0)
    const [countPokemon, setCountPokemon] = useState<number>(0)

    const fetchPokemonList = async (limit: number) => {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`, { cache: 'force-cache' })
            let data = await response.json()
            setCountPokemon(data.count)
            setPokemonList(data.results)
        } catch {
            console.log("error")
        }
    }

    const fetchMorePokemon = async (limit: number, offset: number) => {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, { cache: 'force-cache' })
            let data = await response.json()
            setCountPokemon(data.count)
            setPokemonList(prevList => [...prevList, ...data.results])
        } catch {
            console.log("error")
        }
    }

    useEffect(() => {
        fetchPokemonList(limitLenghtPokemon)
    }, [])

    useEffect(() => {
        setCurrentNbPokemon(pokemonList.length)
    },[pokemonList])

    return (
        <>
            <section className="pokemonListSection">
                <p className="pokemonListInfos">{currentNbPokemon} pokémons out of {countPokemon}</p>
                <div className="pokemonListContainer">
                    {pokemonList.length > 0 ?
                        pokemonList.map((pokemon, index) => (
                            <div className="pokemoncard" key={index}>
                                <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + [index + 1] + ".png"} alt="" />
                                <p>{pokemon.name}</p>
                            </div>
                        ))
                        : null}
                </div>
                <p className="pokemonListInfos">{currentNbPokemon} pokémons out of {countPokemon}</p>
                <LoadMoreBtn functionProps={() => fetchMorePokemon(limitLenghtPokemon, currentNbPokemon)} textProps={"Load more"} />
            </section>
        </>
    )
}
