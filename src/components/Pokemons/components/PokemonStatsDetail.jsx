/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";
import { capitalize } from "../../../helper/functions";

const PokemonStatsDetail = (props) => {
    let css = {
        border: "1px solid #263F60",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        width: "25%",
        fontSize: "0.75em",
        justifyContent: "center",
        color: "#263F60",
        margin: "0.5vh 0.5vh",
        padding: "0.5vh",
    };

    let textTitleCss = {
        fontWeight: 900,
    };

    return (
        <div css={css}>
            <div>
                <span css={textTitleCss}>
                    {capitalize(props.stats.stat.name)}
                </span>
            </div>
            {props.stats.base_stat}
        </div>
    );
};

export default PokemonStatsDetail;
