/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import Slide from "react-reveal/Slide";

const PokemonCards = (props) => {
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
    };

    let hoverCss = `&:hover {
        cursor: pointer;
        transform: scale(1.3);
    }`;

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <Slide bottom>
            <Link to={`/pokemon-detail/${props.pokemon.name}`}>
                <div css={[divCss, hoverCss]}>
                    <img src={props.pokemon.image} alt="pokemon-img" />

                    {capitalize(props.pokemon.name)}
                </div>
            </Link>
        </Slide>
    );
};

export default PokemonCards;
