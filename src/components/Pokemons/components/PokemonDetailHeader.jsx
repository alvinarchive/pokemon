/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import Slide from "react-reveal/Slide";
import { capitalize } from "../../../helper/functions";
import typeColor from "../../../static/color";

const PokemonDetailHeader = (props) => {
    let weightCss = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "#263F60",
        marginBottom: "2vh",
        marginTop: "2vh",
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

    return (
        <div>
            <img
                css={imageCss}
                src={props.data.pokemon.sprites.front_default}
                alt="pokemon-sprites"
            />
            <Slide bottom>
                {capitalize(props.nickname ? props.nickname : props.name)}
                {capitalize(props.nickname ? `(${props.name})` : "")}
            </Slide>
            <div css={typeCss}>
                {props.data.pokemon.types.map((item, index) => {
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
                    <span>{props.data.pokemon.weight} lbs</span>
                </div>
            </Slide>
        </div>
    );
};

export default PokemonDetailHeader;
