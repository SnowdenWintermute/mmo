import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "@permadeath/message-types";
import { UserInput } from "@permadeath/message-types";

function App() {
  const a = new UserInput("butt", "butts");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>o{JSON.stringify(a)}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
