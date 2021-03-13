/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { mqx } from "../../helper/functions";

import Header from "../Header/Header";
import PokemonCard from "./components/PokemonCard";

const MyPokemon = (props) => {
    let pokemons = JSON.parse(localStorage.getItem("myPokemon"));

    let [myPokemons, setMyPokemons] = useState(pokemons ? pokemons : []);

    let detailCss = {
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "15vh",
        userSelect: "none",
        backgroundColor: "#E4EBE0",
        color: "#263F60",
        minHeight: "100vh",
        paddingBottom: "15vh",
    };

    let titleTextCss = {
        fontSize: "1.25em",
        marginBottom: "5vh",
    };

    let pokemonListCss = {
        marginTop: "2.5%",
        display: "flex",
        width: "50%",
        flexWrap: "wrap",
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        [mqx[2]]: {
            width: "100%",
            marginTop: "5%",
        },
    };

    return (
        <div>
            <Header active={props.active} menuItem={props.menuItem} />
            <div css={detailCss}>
                <div css={titleTextCss}>My Pokemon List</div>

                <div css={pokemonListCss}>
                    {myPokemons.length > 0 ? (
                        myPokemons.map((item, index) => {
                            return (
                                <PokemonCard
                                    pokemon={item}
                                    nickname={item.nickname}
                                />
                            );
                        })
                    ) : (
                        <div>No Pokemon Found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPokemon;
