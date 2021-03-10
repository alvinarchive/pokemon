/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";

const MenuItem = (props) => {
    let css = {
        color: "#263F60",
        fontSize: "1.15em",
        display: "block",
        padding: "1vh 2vh",
        margin: "2vh 2vh",
        textAlign: "center",
        listStyleType: "none",
        whiteSpace: "nowrap",
        borderRadius: "8px",
        textAlign: "center",
        zIndex: 10,
        transition: "all 0.1s ease-in",
    };

    let hoverCss = `&:hover {
        background-color: #263F60;
        cursor: pointer;
        color: #E4EBE0;
    }`;

    let linkCss = {
        textDecoration: "none",
    };

    if (props.active === props.menu.name) {
        css.fontWeight = 1000;
    }

    console.log(props.menu);
    return (
        <Link
            to={props.menu.route}
            css={linkCss}
            onClick={() => {
                console.log("clicked");
            }}
        >
            <li css={[css, hoverCss]}>{props.menu.name}</li>
        </Link>
    );
};

export default MenuItem;
