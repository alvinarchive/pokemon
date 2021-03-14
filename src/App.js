import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import React from "react";

import Home from "./components/Home/Home";
import MyPokemon from "./components/Pokemons/MyPokemon";
import PokemonDetail from "./components/Pokemons/PokemonDetail";
import PokemonContextProvider from "./components/PokemonContext/PokemonContext";

import "./App.css";
import "antd/dist/antd.min.css";

function App() {
    //graphql apollo
    const client = new ApolloClient({
        uri: "https://graphql-pokeapi.vercel.app/api/graphql",
        cache: new InMemoryCache(),
    });

    // list menu item
    let menuItem = [
        {
            name: "Home",
            route: "/",
        },
        {
            name: "My Pokemon",
            route: "/my-pokemon",
        },
    ];

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Switch>
                    <PokemonContextProvider>
                        <Route
                            exact
                            path="/"
                            children={
                                <Home menuItem={menuItem} active="Home" />
                            }
                        />
                        <Route
                            exact
                            path="/my-pokemon"
                            children={
                                <MyPokemon
                                    menuItem={menuItem}
                                    active="My Pokemon"
                                />
                            }
                        />

                        <Route
                            exact
                            path="/pokemon-detail/:name/:nickname?"
                            children={
                                <PokemonDetail
                                    menuItem={menuItem}
                                    active="Pokemon Detail"
                                />
                            }
                        />
                    </PokemonContextProvider>
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
