/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { css, jsx, keyframes } from "@emotion/react";
import { bounce, shake, fadeIn } from "../../../helper/anim";
import { mqx } from "../../../helper/functions";
import { Input } from "antd";
import "antd/dist/antd.min.css";

const PokemonCatch = (props) => {
    const { Search } = Input;

    let message = {
        true: "Successfuly Catch The Pokemon!",
        false: "Failed to Catch The Pokemon!",
        tapToClose: "Tap the screen to close!",
    };

    let [catchStatus, setCatchStatus] = useState(Math.random() < 0.5);
    let [catchMessage, setCatchMessage] = useState("");
    let [pokemonCatchSuccess, setSuccessState] = useState(false);
    let [canClose, setCanClose] = useState(false);

    useEffect(
        () => {
            let timeoutCatching;

            if (!catchStatus) {
                timeoutCatching = setTimeout(() => {
                    setCatchMessage(message[catchStatus]);
                    setCanClose(true);
                }, 3500);
            } else {
                timeoutCatching = setTimeout(() => {
                    setCatchMessage(message[catchStatus]);
                    setSuccessState(true);
                }, 5000);
            }
        },
        catchStatus,
        catchMessage
    );

    let catchingPage = {
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        color: "#FFFFFF",
        fontWeight: 900,
        fontSize: "1.5em",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        backgroundColor: "#00000096",
        width: "100vw",
        height: "100vh",
        animation: `${fadeIn} 0.5s ease-in`,
        [mqx[2]]: {
            fontSize: "0.85em",
        },
    };

    let enterNicknameCss = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    };
    let textSuccessCss = {
        marginTop: "2vh",
        fontSize: "0.70em",
        [mqx[2]]: {
            fontSize: "0.600em",
        },
    };

    let textCss = {
        whiteSpace: "pre",
    };

    const rotateCount = () => {
        if (catchStatus) {
            return 3;
        } else {
            return 2;
        }
    };

    let catchingCss = {
        animation: `${bounce} 1s ease 1,  ${shake} 1.25s cubic-bezier(.36,.07,.19,.97) ${rotateCount()} 1s forwards`,
        marginTop: "4vh",

        [mqx[2]]: {
            width: "35vw",
        },
    };

    const onPageClicked = () => {
        if (canClose) {
            props.setIsCatching(false);
        }
    };

    const onEnter = (value) => {
        let saveObject = {
            name: props.pokemonData.pokemon.name,
            nickname: value,
        };

        localStorage.setItem("myPokemon", JSON.stringify(saveObject));
        props.setIsCatching(false);
    };

    return (
        <div css={catchingPage} onClick={onPageClicked}>
            <span css={textCss}>{catchMessage}</span>
            <span css={textCss}>
                {catchMessage && catchMessage == message.false
                    ? message.tapToClose
                    : ""}
            </span>
            {pokemonCatchSuccess ? (
                <div css={enterNicknameCss}>
                    <span css={[textCss, textSuccessCss]}>
                        Enter Pokemon Nickname
                    </span>
                    <Search
                        placeholder="Enter Pokemon NIckname"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onEnter}
                    />
                </div>
            ) : (
                <div></div>
            )}

            <img css={catchingCss} src="/pokeball.png" />
        </div>
    );
};

export default PokemonCatch;
