/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";
import { Link } from "react-router-dom";
import { capitalize } from "../../../helper/functions";
import React, { useContext, useEffect, useState } from "react";

import { PokemonContext } from "../../PokemonContext/PokemonContext";

const PokemonCards = (props) => {
    let pokemonContext = useContext(PokemonContext);
    let [ownedCount, setOwnedCount] = useState(0);

    let divCss = {
        padding: "2.5vh",
        margin: "1vh",
        border: "1px solid #263F60",
        borderRadius: "8px",
        color: "#263F60",
        backgroundColor: "#E4EBE0",
        display: "flex",
        flexDirection: "column",
        transition: "transform .2s",
        maxWidth: "15vh",
    };

    let hoverCss = `&:hover {
        cursor: pointer;
        transform: scale(1.3);
    }`;

    let ellipsisCss = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    let imageCss = {
        alignSelf: "center",
    };

    let deleteCss = {
        color: "white",
        backgroundColor: "#d9534f",
        margin: "1.5vh",
        padding: "0.5vh",
        borderRadius: "8px",
        transition: "transform .2s",
    };

    let ownedCss = {
        fontSize: "0.75em",
    };

    useEffect(() => {
        for (let i = 0; i < pokemonContext.pokemonsState.length; i++) {
            if (pokemonContext.pokemonsState[i].name === props.pokemon.name) {
                setOwnedCount((ownedCount += 1));
            }
        }
    }, []);

    return (
        <div>
            <Link
                to={`/pokemon-detail/${props.pokemon.name}${
                    props.pokemon.nickname ? `/${props.pokemon.nickname}` : ""
                }`}
            >
                <div css={[divCss, hoverCss]}>
                    <img
                        src={props.pokemon.image}
                        css={imageCss}
                        alt="pokemon-img"
                        width="96px"
                        height="96px"
                    />

                    <span css={ellipsisCss}>
                        {capitalize(
                            props.pokemon.nickname
                                ? props.pokemon.nickname
                                : props.pokemon.name
                        )}
                    </span>

                    {!props.pokemon.nickname ? (
                        <span css={ownedCss}>Owned: {ownedCount}</span>
                    ) : (
                        ""
                    )}
                </div>
            </Link>
            {props.pokemon.nickname ? (
                <div
                    css={[deleteCss, hoverCss]}
                    onClick={() => {
                        props.handleDelete(props.id, props.pokemon.nickname);
                    }}
                >
                    Delete
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default PokemonCards;
