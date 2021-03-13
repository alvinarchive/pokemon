import { keyframes } from "@emotion/react";

export const bounce = keyframes`
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

export const shake = keyframes`
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

export let fadeIn = keyframes`
from, 0%, to {
    opacity: 0; 
}
100% {
    opacity: 1;
}`;
