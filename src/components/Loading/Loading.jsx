/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, keyframes } from "@emotion/react";
import { mqx } from "../../helper/functions";
import { shake } from "../../helper/anim";

const Loading = () => {
    let imageCss = {
        width: "10vw",
        [mqx[2]]: {
            width: "25vw",
        },
    };

    let loadingCss = {
        backgroundColor: "#E4EBE0",
        position: "fixed",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
    };

    let shakeAnim = {
        animation: `${shake} 1.25s cubic-bezier(.36,.07,.19,.97) infinite`,
    };

    return (
        <div css={loadingCss}>
            <img
                css={[imageCss, shakeAnim]}
                src="/pokeball.png"
                alt="pokeball"
            />
        </div>
    );
};

export default Loading;
