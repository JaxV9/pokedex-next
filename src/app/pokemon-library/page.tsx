import { PokemonList } from "@/components/pokemonList/pokemonList";

export default function PokemonLibrary() {

    return(
        <>
        <section>
            <div className="pokemonLibraryTop">
                <h1>Pokemon library</h1>
            </div>
            <PokemonList />
        </section>
        </>
    )
}