export type SpeciesType = {
    name: string,
    url: string
}

export type EvolutionChainType = {
    evolves_to: EvolutionChainType[],
    is_baby: boolean,
    species: SpeciesType
}

export type EvolutionType = {
    baby_trigger_item: string | null,
    chain: EvolutionChainType,
    id: number
}