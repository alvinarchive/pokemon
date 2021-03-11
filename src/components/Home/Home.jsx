/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";

import Header from "../Header/Header";
import Pokemons from "../Pokemons/Pokemons";

const Home = (props) => {
    let css = {
        backgroundColor: "#E4EBE0",
        height: "100%",
        margin: 0,
        zIndex: 3,
        fontFamily: "Montserrat",
    };

    return (
        <div css={css}>
            <style>
                @import
                url('https://fonts.googleapis.com/css?family=Montserrat');
            </style>
            <Header active={props.active} menuItem={props.menuItem} />
            <Pokemons />
        </div>
    );
};

export default Home;
