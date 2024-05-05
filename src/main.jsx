// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameEngineProvider } from "./hooks/useGameEngine";
import "./index.css";
import NewPage from "./NewPage";
import { insertCoin } from "playroomkit";

const handleInsertCoin = () => {
  insertCoin({
    streamMode: true,
  }).then(() => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <GameEngineProvider>
          <App />
        </GameEngineProvider>
      </React.StrictMode>
    );
  });
};

const handleHostGame = () => {
  handleInsertCoin();
};

const handleJoinGame = (code) => {
  const gameCode = code.trim();
  if (gameCode) {
    window.location.hash = `r=${gameCode}`;
  } else {
    console.log("Please enter a valid game code!");
  }
  handleHostGame();
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NewPage handleHostGame={handleHostGame} handleJoinGame={handleJoinGame} />
  </React.StrictMode>
);
