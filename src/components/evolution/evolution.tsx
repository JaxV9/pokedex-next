import { useEffect, useState } from "react"

type EvolutionPropsType = {
    currentLangProps: string,
    pokemonProps: PokemonType | null
}

export const Evolution = ({currentLangProps, pokemonProps}:EvolutionPropsType ) => {

    const [evolution, setEvolution] = useState<any>([])


    // const fetchPokemon = async () => {
    //     try {
    //         let response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/`, { cache: 'force-cache' })
    //         let data = await response.json()
    //     } catch {
    //         console.log("error")
    //     }
    // }



    return (
        <>
            <div className="evolutionContainer">
                <div className="evolution">

                </div>
            </div>
        </>
    )
}