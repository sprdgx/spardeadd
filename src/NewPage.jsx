import React, { useState } from "react";
import bg from "./assets/bg.jpg"; // Import your background image

const NewPage = ({ handleHostGame, handleJoinGame }) => {
  const [gameCode, setGameCode] = useState("");

  const handleCodeChange = (event) => {
    setGameCode(event.target.value);
  };

  const handleJoinClick = () => {
    handleJoinGame(gameCode);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: `url('https://i.gifer.com/7UmO.gif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <h1 className="text-3xl font-bold mb-8 text-white text-center z-10 relative">
        Spardead
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 z-10 relative"
        onClick={handleHostGame}
      >
        Host a Game
      </button>
      <div className="flex flex-col items-center z-10 relative">
        <label htmlFor="gameCode" className="text-lg font-semibold mb-2 text-white">
          Enter Game Code:
        </label>
        <input
          type="text"
          id="gameCode"
          value={gameCode}
          onChange={handleCodeChange}
          className="border border-gray-400 rounded px-3 py-2 mb-2 w-full max-w-xs"
        />
        <button
          onClick={handleJoinClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Join Game
        </button>
        <p className="text-white text-center mt-4 z-10 relative">
          Note: The game code will be retrieved from the copied link after hosting.
        </p>
      </div>
    </div>
  );
};

export default NewPage;
