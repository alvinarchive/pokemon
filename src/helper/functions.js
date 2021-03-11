const cssBreakpoint = [320, 425, 768, 1024, 1440];
const mqx = cssBreakpoint.map((bp) => `@media (max-width: ${bp}px)`);

export default {
    mqx: mqx,
};
