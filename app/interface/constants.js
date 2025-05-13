// Values in pixels:
const BREAKPOINTS = {
  laptopMax: 1500,
  tabletMax: 1100,
  phoneMax: 550,
};

// Converted to rems:
export const QUERIES = {
  laptopAndDown: `(max-width: ${BREAKPOINTS.laptopMax / 16}rem)`, // 93.75rem
  tabletAndDown: `(max-width: ${BREAKPOINTS.tabletMax / 16}rem)`, // 68.75rem
  phoneOnly: `(max-width: ${BREAKPOINTS.phoneMax / 16}rem)`, // 34.375rem
};
