import * as React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import Main from "./components/Main";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
