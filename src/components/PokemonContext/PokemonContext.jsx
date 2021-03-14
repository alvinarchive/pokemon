import React, { useState, createContext } from "react";

export const PokemonContext = createContext();

const PokemonContextProvider = (props) => {
    let pokemons = JSON.parse(localStorage.getItem("myPokemon"));
    if (!pokemons) {
        pokemons = [];
    }

    const [pokemonsState, setPokemonsState] = useState(pokemons);

    return (
        <PokemonContext.Provider value={{ pokemonsState, setPokemonsState }}>
            {props.children}
        </PokemonContext.Provider>
    );
};

export default PokemonContextProvider;
