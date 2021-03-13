/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { css, jsx, keyframes } from "@emotion/react";
import { useQuery, gql } from "@apollo/client";
import { Pagination } from "antd";
import { mqx } from "../../helper/functions";
import Slide from "react-reveal/Slide";

import Loading from "../Loading/Loading";
import PokemonCards from "./components/PokemonCard";

const Pokemons = (props) => {
    let [offset, setOffset] = useState(0);
    let [currPage, setPage] = useState(1);

    let pokemonsCss = {
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10%",
        width: "100%",
        height: "100%",
        userSelect: "none",
        backgroundColor: "#E4EBE0",
    };

    let errorCss = {
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E4EBE0",
    };

    let iconCss = {
        width: "25vw",
        zIndex: 3,
        [mqx[2]]: {
            width: "50vw",
        },
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

    let paginationCss = {
        marginTop: "5%",
        marginBottom: "5vh",
    };

    const onPaginationChanged = (page, pageSize) => {
        setOffset(24 * (page - 1));
        setPage(page);
    };

    const GET_POKEMONS = gql`
        query pokemons($limit: Int, $offset: Int) {
            pokemons(limit: $limit, offset: $offset) {
                count
                next
                previous
                status
                message
                results {
                    url
                    name
                    image
                }
            }
        }
    `;

    const gqlVariables = {
        limit: 24,
        offset: offset,
    };

    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: gqlVariables,
    });

    if (loading)
        return (
            <div css={pokemonsCss}>
                <img
                    css={iconCss}
                    src="/asset/pokemon_icon.png"
                    alt="pokemon-icon"
                />
                <Loading />
            </div>
        );

    if (error)
        return <div css={errorCss}>Somethings wrong, please try again</div>;

    return (
        <div css={pokemonsCss}>
            <img
                css={iconCss}
                src="/asset/pokemon_icon.png"
                alt="pokemon-icon"
                width="7.5vw"
            />

            <div css={pokemonListCss}>
                <Slide bottom>
                    {data.pokemons.results.map((item, index) => {
                        return <PokemonCards pokemon={item} key={index} />;
                    })}
                </Slide>
            </div>

            <Pagination
                css={paginationCss}
                total={data.pokemons.count}
                current={currPage}
                showQuickJumper
                pageSize={32}
                responsive={true}
                onChange={onPaginationChanged}
                showSizeChanger={false}
                showTotal={(total) => `Total ${total} items`}
            />
        </div>
    );
};

export default Pokemons;
