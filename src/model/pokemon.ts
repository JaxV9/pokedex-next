type PokemonShortType = {
    name: string,
    url: string
}

type PokemonType = {
    id: number,
    name: string
}

type PokemonSpecies = {
    flavor_text: string,
    language: {
        name: string,
        url: string
    },
    version: {
        name: string,
        url: string
    }
}