import React from "react";
import ReactDOM from "react-dom";
import "./partials/_typography.scss";
import "./partials/_globals.scss";
import "./partials/_variables.scss";
import "./partials/_mixins.scss";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
