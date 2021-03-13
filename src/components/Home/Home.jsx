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
    };

    return (
        <div css={css}>
            <Header active={props.active} menuItem={props.menuItem} />
            <Pokemons />
        </div>
    );
};

export default Home;
