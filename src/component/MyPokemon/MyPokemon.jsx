/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { css, jsx } from "@emotion/react";

import Header from "../Header/Header";

const MyPokemon = (props) => {
    let headerCss = {
        backgroundColor: "#E4EBE0",
        height: "300vh",
        margin: 0,
        zIndex: 3,
    };

    return (
        <div css={headerCss}>
            <Header active={props.active} menuItem={props.menuItem} />
            Ini My Pokemon
        </div>
    );
};

export default MyPokemon;
