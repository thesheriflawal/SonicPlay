"use client";
import { useState } from "react";
import LandingPage from "../components/LandingPage";
import AboutCreator from "../components/AboutCreator";
import ConnectFour from "../components/ConnectFour";
import TicTacToe from "../components/Tic-Tac-Toe";
import DotsAndBoxes from "../components/Dots-and-Boxes";
import HangmanGame from "../components/HangmanGame";
import GomokuGame from "../components/GomokuGame";
import SOSGame from "../components/SOSGame";
import BattleshipGame from "../components/BattleshipGame";

export default function Home() {
  const [currentView, setCurrentView] = useState("landing");
  const [currentGame, setCurrentGame] = useState(null);

  const handleGameSelect = (gameId) => {
    setCurrentView("game");
    setCurrentGame(gameId);
  };

  const handleBackToLanding = () => {
    setCurrentGame(null);
    setCurrentView("landing");
  };

  const handleAboutCreator = () => {
    setCurrentView("about");
  };

  if (currentView === "about") {
    return <AboutCreator onBack={handleBackToLanding} />;
  }

  if (currentView === "landing") {
    return (
      <LandingPage
        onGameSelect={handleGameSelect}
        onAboutCreator={handleAboutCreator}
      />
    );
  }

  switch (currentGame) {
    case "connect-four":
      return <ConnectFour onBackToLanding={handleBackToLanding} />;
    case "tic-tac-toe":
      return <TicTacToe onBackToLanding={handleBackToLanding} />;
    case "dots-and-boxes":
      return <DotsAndBoxes onBackToLanding={handleBackToLanding} />;
    case "hangman":
      return <HangmanGame onBackToLanding={handleBackToLanding} />;
    case "gomoku":
      return <GomokuGame onBackToLanding={handleBackToLanding} />;
    case "sos":
      return <SOSGame onBackToLanding={handleBackToLanding} />;
    case "battleship":
      return <BattleshipGame onBackToLanding={handleBackToLanding} />;
    default:
      return (
        <LandingPage
          onGameSelect={handleGameSelect}
          onAboutCreator={handleAboutCreator}
        />
      );
  }
}
