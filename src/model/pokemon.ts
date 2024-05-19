type PokemonShortType = {
    name: string,
    url: string
}

type PokemonType = {
    id: number,
    name: string
}

type PokemonDatas = {
    id: number,
    name: string,
    height: number,
    weight: number,
    types: {
        slot: number
        type: {
            name: string
            url: string
        }
    }[]

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