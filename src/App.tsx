import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

function App() {
  return (
    <GlobalStyle>
      <h1>aaa</h1>
    </GlobalStyle>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
${reset}
*{
  box-sizing: border-box;
}`;
