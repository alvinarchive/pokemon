/** @jsxRuntime classic */
/** @jsx jsx */

import { useQuery, gql } from "@apollo/client";
import { css, jsx } from "@emotion/react";
import { mqx } from "../../../helper/functions";
import colorType from "../../../static/color";

const PokemonMove = (props) => {
    const GET_MOVE_DETAIL = gql`
        query move($move: String!) {
            move(move: $move) {
                response
            }
        }
    `;

    const gqlVariables = {
        move: props.move.move.name,
    };

    let headerMoveCss = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        fontSize: "0.75em",
    };

    let textCss = {
        width: "20%",
        fontSize: "0.75em",
        [mqx[2]]: {
            fontSize: "0.60em",
        },
    };

    const { loading, error, data } = useQuery(GET_MOVE_DETAIL, {
        variables: gqlVariables,
    });

    if (loading) {
        return "";
    }

    let typeCss = {
        color:
            colorType[data.move.response.type.name] === "#9eb7b"
                ? "000000"
                : "#FFFFFF",
        backgroundColor: data.move.response.type.name
            ? colorType[data.move.response.type.name]
            : "#FFFFFF",
    };

    return (
        <div css={headerMoveCss}>
            <div css={textCss}>{data.move.response.name}</div>
            <div css={textCss}>
                <div css={typeCss}>{data.move.response.type.name}</div>
            </div>
            <div css={textCss}>{data.move.response.pp}</div>
            <div css={textCss}>
                {data.move.response.power ? data.move.response.pp : "-"}
            </div>
            <div css={textCss}>{data.move.response.priority}</div>
        </div>
    );
};

export default PokemonMove;
