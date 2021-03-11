/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { css, jsx, keyframes } from "@emotion/react";

const PokemonCatch = (props) => {
    let message = {
        true: "Successfuly Catch The Pokemon !",
        false: "Failed to Catch The Pokemon !",
    };

    let [catchStatus, setCatchStatus] = useState(Math.random() < 0.5);
    let [catchMessage, setCatchMessage] = useState("");
    let [canClose, setCanClose] = useState(false);

    useEffect(
        () => {
            let timeoutCatching;
            let timeoutCatchingParent;

            if (!catchStatus) {
                timeoutCatching = setTimeout(() => {
                    console.log(message[catchStatus]);
                    setCatchMessage(message[catchStatus]);

                    timeoutCatchingParent = setTimeout(() => {
                        props.setIsCatching(false);
                    }, 1500);
                }, 3500);
            } else {
                timeoutCatching = setTimeout(() => {
                    console.log(message[catchStatus]);
                    setCatchMessage(message[catchStatus]);
                    setCanClose(true);
                }, 5000);
            }
        },
        catchStatus,
        catchMessage
    );

    const bounce = keyframes`
        from, 20%, 53%, 80%, to {
        transform: translate3d(0,0,0);
        }
    
        40%, 43% {
        transform: translate3d(0, -49px, 0);
        }
    
        70% {
        transform: translate3d(0, -15px, 0);
        }
    
        90% {
        transform: translate3d(0,-4px,0);
        }
  `;

    const shake = keyframes`
        from, 0, to {
            transform: translate(0, 0) rotate(0);
        }

        20% {
            transform: translate(-10px, 0) rotate(-20deg);
        }

        30% {
            transform: translate(10px, 0) rotate(20deg);
        }

        50% {
            transform: translate(-10px, 0) rotate(-10deg);
        }

        60% {
            transform: translate(10px, 0) rotate(10deg);
        }

        100% {
            transform: translate(0, 0) rotate(0);
        }
        `;

    let fadeIn = keyframes`
        from, 0%, to {
            opacity: 0; 
        }
        100% {
            opacity: 1;
        }`;

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
        backgroundColor: "#00000066",
        width: "100vw",
        height: "100vh",
        animation: `${fadeIn} 0.5s ease-in`,
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
    };

    const onPageClicked = () => {
        if (canClose) {
            props.setIsCatching(false);
        }
    };

    return (
        <div css={catchingPage} onClick={onPageClicked}>
            <span>{catchMessage}</span>
            <img css={catchingCss} src="/pokeball.png" />
        </div>
    );
};

export default PokemonCatch;
