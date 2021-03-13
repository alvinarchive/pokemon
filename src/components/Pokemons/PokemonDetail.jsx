/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { css, jsx } from "@emotion/react";
import { mqx } from "../../helper/functions";

import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import PokemonStats from "./components/PokemonStats";
import PokemonMoves from "./components/PokemonMoves";
import PokemonCatch from "./components/PokemonCatch";
import PokemonDetailHeader from "./components/PokemonDetailHeader";

const PokemonDetail = (props) => {
    let { name, nickname } = useParams();

    let [isCatching, setIsCatching] = useState();

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

    const GET_POKEMONS_DETAIL = gql`
        query pokemon($name: String!) {
            pokemon(name: $name) {
                id
                name
                weight
                stats {
                    base_stat
                    stat {
                        name
                    }
                }
                abilities {
                    ability {
                        name
                        url
                    }
                }
                sprites {
                    front_default
                }
                moves {
                    move {
                        name
                        url
                    }
                }
                types {
                    type {
                        name
                    }
                }
                species {
                    name
                    url
                }
            }
        }
    `;

    const gqlVariables = {
        name: name,
    };

    const { loading, error, data } = useQuery(GET_POKEMONS_DETAIL, {
        variables: gqlVariables,
    });

    if (loading) {
        return (
            <div>
                <Loading />
                <Header
                    css={css}
                    active={props.active}
                    menuItem={props.menuItem}
                />
            </div>
        );
    }

    let cardCss = {
        display: "flex",
        width: "50vw",
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.4)",
        transition: "0.3s",
        padding: "2vh",
        fontSize: "1.15em",
        borderRadius: "8px",
        [mqx[2]]: {
            width: "90vw",
        },
    };

    let pokeballCss = {
        position: "fixed",
        right: 0,
        bottom: 0,
        padding: "3vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        transition: "transform .2s",

        [mqx[2]]: {
            fontSize: "0.75em",
        },
    };

    let pokeballImageCss = {
        width: "5vw",
        [mqx[2]]: {
            width: "15vw",
        },
    };

    let hoverCss = `&:hover {
        cursor: pointer;
        transform: scale(1.15);
    }`;

    const onPokeballClicked = () => {
        setIsCatching(true);
    };

    return (
        <div>
            <Header active={props.active} menuItem={props.menuItem} />

            {/* Catching Page */}
            {isCatching ? (
                <PokemonCatch
                    setIsCatching={setIsCatching}
                    pokemonData={data}
                />
            ) : (
                ""
            )}

            <div css={detailCss}>
                <div css={cardCss}>
                    <PokemonDetailHeader
                        data={data}
                        name={name}
                        nickname={nickname}
                    />
                    <PokemonStats data={data} />
                    <PokemonMoves data={data} />
                </div>

                <div css={[pokeballCss, hoverCss]} onClick={onPokeballClicked}>
                    <img
                        css={pokeballImageCss}
                        src="/pokeball.png"
                        alt="pokeball"
                    />
                    <span> Catch Pokemon !</span>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;
