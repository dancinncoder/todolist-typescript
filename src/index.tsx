import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Provider } from "react-redux";
import store from "./redux/config/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`
${reset}
*{
  box-sizing: border-box;
}`;

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
