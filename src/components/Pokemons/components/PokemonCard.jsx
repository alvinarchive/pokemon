/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";
import { Link } from "react-router-dom";
import { capitalize } from "../../../helper/functions";

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

                    {capitalize(
                        props.pokemon.nickname
                            ? props.pokemon.nickname
                            : props.pokemon.name
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
