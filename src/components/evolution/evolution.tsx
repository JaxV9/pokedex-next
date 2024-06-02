import { EvolutionChainType, EvolutionType, SpeciesType } from "@/model/evolution"
import { getLastElementFromUrl } from "@/utils/format"
import { url } from "inspector"
import { useEffect, useState } from "react"

type EvolutionPropsType = {
    currentLangProps: string,
    pokemonProps: PokemonType | null,
    evolutionUrlProps: string
}

export const Evolution = ({ currentLangProps, pokemonProps, evolutionUrlProps }: EvolutionPropsType) => {

    const [evolution, setEvolution] = useState<EvolutionType | null>(null)


    const fetchPokemon = async () => {
        try {
            let response = await fetch(`${evolutionUrlProps}`, { cache: 'force-cache' })
            let data = await response.json()
            setEvolution(data)
        } catch {
            console.log("error")
        }
    }

    const getEvolutionNames = (evolutionChain: EvolutionChainType): SpeciesType[] => {
        let species = [{ name: evolutionChain.species.name, url: evolutionChain.species.url }];
    
        evolutionChain.evolves_to.forEach(ev => {
            species = [...species, ...getEvolutionNames(ev)];
        });
    
        return species;
    }

    useEffect(() => {
        fetchPokemon()
    }, [evolutionUrlProps])

    useEffect(() => {
        console.log(evolution)
    }, [evolution])

    return (
        <>
            <div className="evolutionContainer">
                {
                    evolution ?
                    getEvolutionNames(evolution.chain).map(
                            (species, index) => (
                                <div className="evolution" key={index}>
                                <div className="evolutionPicture"
                                style={{backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getLastElementFromUrl(species.url)}.png`}}>
                                </div>
                                <p className="pokemonEvolutionLabel">{species.name}</p>
                            </div>
                            )
                        )
                    : null
                }

            </div>
        </>
    )
}