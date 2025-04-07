import { createGlobalStyle } from "styled-components";
import { darkBackgroundGreen } from "./Colors";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: ${darkBackgroundGreen};
    color: white;
  }
`;

export default GlobalStyles;
