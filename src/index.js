import React from "react";
import ReactDOM from "react-dom";
import { addFive } from "./components/maths";

ReactDOM.render(
  <>
    <h1>Hello world</h1>
    <p>{addFive(3)}</p>
  </>,
  document.getElementById("app")
);
