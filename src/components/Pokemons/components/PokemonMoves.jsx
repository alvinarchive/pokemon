/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { css, jsx } from "@emotion/react";
import { mqx } from "../../../helper/functions";
import Slide from "react-reveal/Slide";
import { Pagination } from "antd";
import "antd/dist/antd.min.css";

import PokemonMove from "./PokemonMove";

const PokemonMoves = (props) => {
    let [pokemonMovesData, setPokemonMoves] = useState(
        props.data.pokemon.moves.slice(0, 15)
    );

    let [currPage, setPage] = useState(1);

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

    let headerCss = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "#263F60",
        marginBottom: "2vh",
        marginTop: "2vh",
    };

    let notFoundCss = {
        width: "100%",
        marginTop: "4vh",
        fontSize: "0.75em",
        justifyContent: "center",

        [mqx[2]]: {
            fontSize: "0.60em",
        },
    };

    let paginationCss = {
        marginTop: "2vh",
    };

    const onPaginationChanged = (page, pageSize) => {
        setPokemonMoves(
            props.data.pokemon.moves.slice((page - 1) * 15, page * 15)
        );
        setPage(page);
    };

    return (
        <div>
            <Slide bottom>
                <span css={headerCss}>Pokemon Moves</span>
            </Slide>
            <Slide bottom>
                <div css={headerMoveCss}>
                    <div css={textCss}>Name</div>
                    <div css={textCss}>Type</div>
                    <div css={textCss}>PP</div>
                    <div css={textCss}>Power</div>
                    <div css={textCss}>Priority</div>
                </div>
            </Slide>
            <Slide bottom>
                {props.data.pokemon.moves.length > 0 ? (
                    pokemonMovesData.map((item, index) => {
                        console.log("ALVIN", item, index);
                        return <PokemonMove move={item} key={index} />;
                    })
                ) : (
                    <div css={notFoundCss}>No pokemon moves found</div>
                )}
            </Slide>
            {props.data.pokemon.moves.length > 0 ? (
                <div css={paginationCss}>
                    <Pagination
                        total={props.data.pokemon.moves.length}
                        showTotal={(total) =>
                            `Total ${props.data.pokemon.moves.length} items`
                        }
                        showSizeChanger={false}
                        pageSize={15}
                        current={currPage}
                        responsive={true}
                        onChange={onPaginationChanged}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default PokemonMoves;
