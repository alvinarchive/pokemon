/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { css, jsx } from "@emotion/react";
import Slide from "react-reveal/Slide";

import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import typeColor from "../../static/color";
import PokemonStats from "./components/PokemonStats";
import PokemonMove from "./components/PokemonMove";
import PokemonCatch from "./components/PokemonCatch";

const PokemonDetail = (props) => {
    const cssBreakpoint = [320, 425, 768, 1024, 1440];
    const mqx = cssBreakpoint.map((bp) => `@media (max-width: ${bp}px)`); //mediaquery max

    let { name } = useParams();
    let [isCatching, setIsCatching] = useState();

    let globalCss = {
        fontFamily: "Montserrat",
    };

    let detailCss = {
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "15vh",
        userSelect: "none",
        backgroundColor: "#E4EBE0",
        color: "#263F60",
        paddingBottom: "10vh",
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

    let imageCss = {
        width: "20vh",
        margin: "auto",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    };

    let typeCss = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75em",
        marginBottom: "2vh",
    };

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    let statsCss = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "4vh",
    };

    let weightCss = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "#263F60",
        marginBottom: "2vh",
        marginTop: "2vh",
    };

    let headerMoveCss = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
    };

    let textCss = {
        width: "20%",
        fontSize: "0.75em",
        fontWeight: 900,
        [mqx[2]]: {
            fontSize: "0.60em",
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
        <div css={globalCss}>
            <style>
                @import
                url('https://fonts.googleapis.com/css?family=Montserrat');
            </style>
            <Header active={props.active} menuItem={props.menuItem} />

            {/* Catching Page */}
            {isCatching ? <PokemonCatch setIsCatching={setIsCatching} /> : ""}

            <div css={[detailCss]}>
                <div css={cardCss}>
                    <img
                        css={imageCss}
                        src={data.pokemon.sprites.front_default}
                        alt="pokemon-sprites"
                    />
                    <Slide bottom>{capitalize(name)}</Slide>
                    <div css={typeCss}>
                        {data.pokemon.types.map((item, index) => {
                            let typeCss = {
                                display: "flex",
                                flexDirection: "row",
                                backgroundColor: typeColor[item.type.name],
                                color: "white",
                                margin: "0.5vh",
                                padding: "0.75vh 1.5vh",
                                borderRadius: "4px",
                            };
                            return (
                                <Slide bottom>
                                    <div css={typeCss}>
                                        {capitalize(item.type.name)}
                                    </div>
                                </Slide>
                            );
                        })}
                    </div>
                    {/* Pokemon Weight */}
                    <Slide bottom>
                        <div css={weightCss}>
                            <span>Weight</span>
                            <span>{data.pokemon.weight} lbs</span>
                        </div>
                    </Slide>

                    {/* Pokemon Stats */}
                    <Slide bottom>
                        <div css={statsCss}>
                            {data.pokemon.stats.map((item, index) => {
                                return (
                                    <PokemonStats stats={item} key={index} />
                                );
                            })}
                        </div>
                    </Slide>

                    {/* Pokemon Moves */}
                    <Slide bottom>
                        <span css={weightCss}>Moves</span>
                        <div css={headerMoveCss}>
                            <div css={textCss}>Name</div>
                            <div css={textCss}>Type</div>
                            <div css={textCss}>PP</div>
                            <div css={textCss}>Power</div>
                            <div css={textCss}>Priority</div>
                        </div>
                    </Slide>

                    <Slide bottom>
                        {data.pokemon.moves.map((item, index) => {
                            return <PokemonMove move={item} key={index} />;
                        })}
                    </Slide>
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
