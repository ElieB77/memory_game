import React from "react";
import Home from "./components/Layout/Home";
import "./styles/globals.scss";
import "./styles/index.scss";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Home />
      </div>
      <a href="https://github.com/ElieB77" target={"_blank"}>
        <p className="credit">
          <span>
            <img src="/square-github.svg" alt="Github Icon" />
          </span>
          Coded by ElieB77
        </p>
      </a>
    </div>
  );
}

export default App;
