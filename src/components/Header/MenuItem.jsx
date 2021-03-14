/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";
import { Link } from "react-router-dom";
import { mqx } from "../../helper/functions";

const MenuItem = (props) => {
    let css = {
        color: "#263F60",
        fontSize: "1.15em",
        display: "block",
        padding: "1vh 2vh",
        margin: "2vh 2vh",
        textAlign: "center",
        whiteSpace: "nowrap",
        borderRadius: "8px",
        zIndex: 10,
        textDecoration: "none",
        transition: "all 0.1s ease-in",
        [mqx[2]]: {
            fontSize: "1.5em",
        },
    };

    let hoverCss = `&:hover {
        background-color: #263F60;
        cursor: pointer;
        color: #E4EBE0;
    }`;

    let liCss = {
        listStyleType: "none",
    };

    if (props.active === props.menu.name) {
        css.fontWeight = 1000;
    }

    return (
        <li css={liCss}>
            <Link
                to={props.menu.route}
                css={[css, hoverCss]}
                onClick={() => {}}
            >
                {props.menu.name}
            </Link>
        </li>
    );
};

export default MenuItem;
