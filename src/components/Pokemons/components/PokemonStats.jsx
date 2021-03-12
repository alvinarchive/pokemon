/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";
import Slide from "react-reveal/Slide";
import PokemonStatsDetail from "./PokemonStatsDetail";

const PokemonStats = (props) => {
    let statsCss = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "4vh",
    };

    return (
        <Slide bottom>
            <div css={statsCss}>
                {props.data.pokemon.stats.map((item, index) => {
                    return <PokemonStatsDetail stats={item} key={index} />;
                })}
            </div>
        </Slide>
    );
};

export default PokemonStats;
