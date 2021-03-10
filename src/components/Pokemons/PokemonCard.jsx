/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { css, jsx, keyframes } from "@emotion/react";
import { useQuery, gql } from "@apollo/client";
import Slide from "react-reveal/Slide";

const PokemonCards = (props) => {
    let divCss = {
        padding: "2.5vh",
        margin: "1vh",
        border: "1px solid #263F60",
        color: "#263F60",
        backgroundColor: "#E4EBE0",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        transition: "transform .2s",
    };

    let hoverCss = `&:hover {
        cursor: pointer;
        transform: scale(1.4);
    }`;

    return (
        <Slide bottom>
            <div css={[divCss, hoverCss]}>
                <img src={props.pokemon.image} alt="pokemon-img" />
                {props.pokemon.name}
            </div>
        </Slide>
    );
};

export default PokemonCards;
