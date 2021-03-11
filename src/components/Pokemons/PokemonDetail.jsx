/** @jsxRuntime classic */
/** @jsx jsx */

import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { css, jsx } from "@emotion/react";
import Slide from "react-reveal/Slide";

import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import typeColor from "../../static/color";
import PokemonStats from "./components/PokemonStats";

const PokemonDetail = (props) => {
    const cssBreakpoint = [320, 425, 768, 1024, 1440];
    const mqx = cssBreakpoint.map((bp) => `@media (max-width: ${bp}px)`); //mediaquery max

    let { name } = useParams();

    let detailCss = {
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "15vh",
        width: "100%",
        height: "100vh",
        userSelect: "none",
        backgroundColor: "#E4EBE0",
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
                    }
                }
                types {
                    type {
                        name
                    }
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

    console.log(data);

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
            width: "75vw",
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
        marginBottom: "4vh",
    };

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    let statsCss = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    };

    return (
        <div>
            <Header active={props.active} menuItem={props.menuItem} />
            <div css={[detailCss]}>
                <Slide bottom>
                    <div css={cardCss}>
                        <img
                            css={imageCss}
                            src={data.pokemon.sprites.front_default}
                            alt="pokemon-sprites"
                        />
                        <Slide bottom>{capitalize(name)}</Slide>

                        <div css={typeCss}>
                            {data.pokemon.types.map((item, index) => {
                                console.log(item);
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

                        {/* Pokemon Stats */}
                        <Slide bottom>
                            <div css={statsCss}>
                                {data.pokemon.stats.map((item, index) => {
                                    console.log(item);
                                    return <PokemonStats stats={item} />;
                                })}
                            </div>
                        </Slide>
                    </div>
                </Slide>
            </div>
        </div>
    );
};

export default PokemonDetail;
