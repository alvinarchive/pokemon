/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";
import { Link } from "react-router-dom";

const MenuItem = (props) => {
    const cssBreakpoint = [320, 425, 768, 1024, 1440];
    const mqx = cssBreakpoint.map((bp) => `@media (max-width: ${bp}px)`); //mediaquery max

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
        zIndex: 10,
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

    let linkCss = {
        textDecoration: "none",
    };

    if (props.active === props.menu.name) {
        css.fontWeight = 1000;
    }

    return (
        <Link to={props.menu.route} css={linkCss} onClick={() => {}}>
            <li css={[css, hoverCss]}>{props.menu.name}</li>
        </Link>
    );
};

export default MenuItem;
