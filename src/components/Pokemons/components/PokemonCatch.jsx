/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useContext, useEffect, useState } from "react";
import { css, jsx, keyframes } from "@emotion/react";
import { bounce, shake, fadeIn } from "../../../helper/anim";
import { mqx } from "../../../helper/functions";
import { Input } from "antd";
import { v4 as uuid } from "uuid";

import { PokemonContext } from "../../PokemonContext/PokemonContext";

const PokemonCatch = (props) => {
    let pokemonContext = useContext(PokemonContext);
    const { Search } = Input;

    let message = {
        true: "Successfuly Catch The Pokemon!",
        false: "Failed to Catch The Pokemon!",
        tapToClose: "Tap the screen to close!",
    };

    let [catchStatus, setCatchStatus] = useState(Math.random() < 0.5);
    let [catchMessage, setCatchMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

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
        [mqx[2]]: {
            width: "90vw",
        },
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

    let errorCss = {
        color: "red",
        fontSize: "0.60em",
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
        if (!value) {
            setErrorMessage("Cannot use empty nickname");
            return;
        }

        let saveObject = {
            name: props.pokemonData.pokemon.name,
            nickname: value,
            image: props.pokemonData.pokemon.sprites.front_default,
            id: uuid(),
        };

        let pokemons = JSON.parse(localStorage.getItem("myPokemon"));

        if (!pokemons) {
            pokemons = [];
        }

        for (let i = 0; i < pokemons.length; i++) {
            if (
                pokemons[i].nickname.toLowerCase() == value.toLowerCase() &&
                pokemons[i].name == props.pokemonData.pokemon.name
            ) {
                setErrorMessage("Nickname for this pokemon already used");
                return;
            }
        }

        pokemons.push(saveObject);
        localStorage.setItem("myPokemon", JSON.stringify(pokemons));
        pokemonContext.setPokemonsState(pokemons);
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
                        placeholder="Nickname"
                        allowClear
                        enterButton="Enter"
                        size="large"
                        onSearch={onEnter}
                        maxLength={20}
                    />
                    <span css={errorCss}>{errorMessage}</span>
                </div>
            ) : (
                ""
            )}

            <img css={catchingCss} src="/pokeball.png" />
        </div>
    );
};

export default PokemonCatch;
