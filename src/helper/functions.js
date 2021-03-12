/** Responsive */
const cssBreakpoint = [320, 425, 768, 1024, 1440];
export const mqx = cssBreakpoint.map((bp) => `@media (max-width: ${bp}px)`);

/** Capitalize Text */
export const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export default {
    mqx,
    capitalize,
};
