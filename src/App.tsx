import Game from "./components/Layout/Game";
import Home from "./components/Layout/Home";
import "./styles/globals.scss";
import "./styles/index.scss";
import type { RootState } from "./app/store";
import { useSelector } from "react-redux";

function App() {
  const render = useSelector((state: RootState) => state.render.value);

  return (
    <div className="app">
      <div className="container">{render === "home" ? <Home /> : <Game />}</div>
      <a href="https://github.com/ElieB77" target={"_blank"} rel="noreferrer">
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
