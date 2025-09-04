"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  Trophy,
  Users,
  Star,
  Crown,
  Gamepad2,
  Sparkles,
  Grid3X3,
  Circle,
  Target,
  Anchor,
  Flame,
  Shield,
  Sword,
  Hexagon,
  Coins,
  ExternalLink,
  Info,
  User,
  AlertTriangle,
} from "lucide-react";

const LandingPage = ({
  onGameSelect = () => {},
  onAboutCreator = () => {},
}) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showGameInstructions, setShowGameInstructions] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const games = [
    {
      id: "tic-tac-toe",
      title: "Tic Tac Toe",
      description: "Classic 3x3 grid strategy game",
      icon: Grid3X3,
      status: "available",
      players: "2 Players",
      difficulty: "Easy",
      gradient: "from-emerald-500 to-teal-600",
      glowColor: "emerald-400",
      instructions:
        "Take turns placing X's and O's on a 3x3 grid. The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins the game. If all 9 squares are filled without a winner, it's a tie.",
    },
    {
      id: "connect-four",
      title: "Connect Four",
      description: "Drop discs to connect four in a row",
      icon: Circle,
      status: "available",
      players: "2 Players",
      difficulty: "Medium",
      gradient: "from-blue-500 to-purple-600",
      glowColor: "blue-400",
      instructions:
        "Players take turns dropping colored discs into a 7-column, 6-row grid. The objective is to be the first to form a horizontal, vertical, or diagonal line of four of your own discs. Plan your moves strategically to block your opponent while creating your own winning combinations.",
    },
    {
      id: "dots-and-boxes",
      title: "Dots and Boxes",
      description: "Complete squares to claim territory",
      icon: Target,
      status: "available",
      players: "2-4 Players",
      difficulty: "Medium",
      gradient: "from-orange-500 to-red-600",
      glowColor: "orange-400",
      instructions:
        "Players take turns drawing lines between dots on a grid. When a player completes the fourth side of a box, they claim it and get another turn. The game ends when all possible lines are drawn, and the player with the most boxes wins. Strategy involves forcing opponents into giving you boxes while avoiding giving them easy wins.",
    },
    {
      id: "hangman",
      title: "Hangman",
      description: "Guess the word before time runs out",
      icon: Anchor,
      status: "available",
      players: "2 Players",
      difficulty: "Easy",
      gradient: "from-pink-500 to-rose-600",
      glowColor: "pink-400",
      instructions:
        "One player thinks of a word and draws blank spaces for each letter. The other player guesses letters one at a time. Correct guesses reveal the letter's position(s) in the word. Wrong guesses add parts to a hangman drawing. The guesser wins by completing the word before the drawing is finished.",
    },
    {
      id: "sos",
      title: "SOS Game",
      description: "Create SOS sequences on the grid",
      icon: Flame,
      status: "available",
      players: "2 Players",
      difficulty: "Medium",
      gradient: "from-yellow-500 to-orange-600",
      glowColor: "yellow-400",
      instructions:
        "Players take turns placing S or O letters on a grid, trying to form the sequence 'SOS' horizontally, vertically, or diagonally. Each time you complete an SOS, you score a point and get another turn. The game ends when the grid is full, and the player with the most SOS sequences wins.",
    },
    {
      id: "gomoku",
      title: "Gomoku (Five in a Row)",
      description: "First to get 5 in a row wins",
      icon: Crown,
      status: "available",
      players: "2 Players",
      difficulty: "Hard",
      gradient: "from-indigo-500 to-purple-600",
      glowColor: "indigo-400",
      instructions:
        "Also known as Five in a Row, players alternate placing black and white stones on a 15x15 grid. The objective is to be the first to get exactly five stones in a row horizontally, vertically, or diagonally. Unlike Tic Tac Toe, the board is larger and requires more strategic thinking to both attack and defend.",
    },
    {
      id: "battleship",
      title: "Battleship",
      description: "Sink your opponent's fleet",
      icon: Shield,
      status: "available",
      players: "2 Players",
      difficulty: "Medium",
      gradient: "from-cyan-500 to-blue-600",
      glowColor: "cyan-400",
      instructions:
        "Each player secretly places ships of various sizes on their grid. Players take turns calling out coordinates to 'fire' at the opponent's grid. The opponent responds with 'hit' or 'miss'. When all squares of a ship are hit, it's sunk. The first player to sink all of their opponent's ships wins.",
    },
    {
      id: "nim",
      title: "Nim (Matchstick Game)",
      description: "Strategic stone removal game",
      icon: Sword,
      status: "coming-soon",
      players: "2 Players",
      difficulty: "Hard",
      gradient: "from-gray-500 to-slate-600",
      glowColor: "gray-400",
      instructions:
        "Start with several piles of objects (stones, matchsticks, etc.). Players take turns removing any number of objects from a single pile. The goal varies by version: in 'normal play', the player who takes the last object wins; in 'misère play', the player who takes the last object loses. Mathematical strategy is key to victory.",
    },
    {
      id: "sprouts",
      title: "Sprouts",
      description: "Draw lines and create new spots",
      icon: Sparkles,
      status: "coming-soon",
      players: "2 Players",
      difficulty: "Hard",
      gradient: "from-green-500 to-emerald-600",
      glowColor: "green-400",
      instructions:
        "Start with a few spots on paper. Players take turns drawing a line between two spots (or from a spot to itself) and adding a new spot somewhere along the line. No spot can have more than three lines connected to it, and lines cannot cross. The player who cannot make a valid move loses.",
    },
    {
      id: "paper-soccer",
      title: "Paper Soccer",
      description: "Score goals on a paper field",
      icon: Hexagon,
      status: "coming-soon",
      players: "2 Players",
      difficulty: "Medium",
      gradient: "from-lime-500 to-green-600",
      glowColor: "lime-400",
      instructions:
        "Played on a rectangular grid representing a soccer field with goals at each end. Players take turns drawing lines between adjacent dots, moving a 'ball' (the current position). You get another turn if you score or if your line crosses an existing line. The objective is to reach the opponent's goal line. Lines cannot be reused.",
    },
  ];

  const stats = [
    { label: "Games Available", value: "7", icon: Gamepad2 },
    { label: "Coming Soon", value: "3", icon: Star },
    { label: "Blockchain Secured", value: "100%", icon: Shield },
    { label: "Community Players", value: "1K+", icon: Users },
  ];

  const sonicFaucets = [
    {
      name: "Sonic Testnet Faucet",
      url: "https://testnet.soniclabs.com/account",
    },
    { name: "Sonic Official Bridge", url: "https://bridge.soniclabs.com/" },
    { name: "Chainlist - Add Sonic", url: "https://chainlist.org/chain/146" },
    { name: "Sonic Documentation", url: "https://docs.soniclabs.com/" },
    { name: "debridge", url: "https://app.debridge.finance/" },
  ];

  const GameInstructionsModal = ({ game, onClose }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`bg-gradient-to-r ${game.gradient} p-3 rounded-2xl`}
            >
              <game.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{game.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-2">
              How to Play
            </h4>
            <p className="text-gray-300 leading-relaxed">{game.instructions}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700/50">
            <div>
              <span className="text-gray-500 text-sm">Players:</span>
              <p className="text-white font-medium">{game.players}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Difficulty:</span>
              <p
                className={`font-medium ${
                  game.difficulty === "Easy"
                    ? "text-green-400"
                    : game.difficulty === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {game.difficulty}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 bg-gray-700/50 text-gray-300 rounded-xl font-semibold hover:bg-gray-600/50 transition-all duration-200"
          >
            Close
          </button>
          {game.status === "available" && (
            <button
              onClick={() => {
                onClose();
                onGameSelect(game.id);
              }}
              className={`flex-1 py-3 px-6 bg-gradient-to-r ${game.gradient} text-white rounded-xl font-semibold hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2`}
            >
              <Play className="w-4 h-4" />
              Play Now
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Mouse Follower Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-full">
                <Coins className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-400 mb-6 tracking-tight">
            GameHub
          </h1>

          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full blur-xl"></div>
            <p className="relative text-xl md:text-2xl lg:text-3xl text-gray-300 font-light px-8 py-3 rounded-full border border-blue-500/30 backdrop-blur-sm">
              Powered by Sonic Network
            </p>
          </div>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Experience classic games reimagined with Sonic blockchain
            technology. Lightning-fast transactions, minimal fees, and secure
            gameplay.
          </p>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  🚀 Deployed on Sonic Network
                </h3>
                <p className="text-gray-300 mb-4">
                  All games are deployed on the Sonic mainnet (Chain ID: 146).
                  You&apos;ll need Sonic (S) tokens to play and interact with
                  the smart contracts. Enjoy ultra-fast transactions and minimal
                  fees!
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 font-medium">
                    Get started with Sonic:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sonicFaucets.map((faucet, index) => (
                      <a
                        key={index}
                        href={faucet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-lg hover:bg-blue-500/30 transition-colors duration-200"
                      >
                        {faucet.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onAboutCreator}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-300 rounded-xl hover:from-blue-600/30 hover:to-cyan-600/30 hover:border-blue-400/50 transition-all duration-300"
          >
            <User className="w-4 h-4" />
            About Creator
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 md:p-6 text-center group-hover:border-blue-500/50 transition-all duration-300">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Games Grid */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Adventure
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {games.map((game, index) => (
              <div
                key={game.id}
                className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  selectedGame === game.id ? "scale-105" : ""
                }`}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-${
                    game.glowColor
                  }/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 ${
                    game.status === "available" ? "opacity-100" : "opacity-40"
                  }`}
                ></div>

                {/* Card */}
                <div
                  className={`relative bg-gray-800/70 backdrop-blur-md border rounded-3xl p-4 md:p-6 h-full transition-all duration-300 ${
                    game.status === "available"
                      ? "border-gray-700/50 group-hover:border-blue-500/50 group-hover:bg-gray-700/70"
                      : "border-gray-700/30 opacity-75"
                  }`}
                >
                  {/* Status Badge */}
                  {game.status === "coming-soon" && (
                    <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full border border-yellow-500/30">
                      Coming Soon
                    </div>
                  )}

                  {game.status === "available" && (
                    <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30 animate-pulse">
                      Live
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`relative mb-4 md:mb-6 ${
                      game.status === "available" ? "group-hover:scale-110" : ""
                    } transition-transform duration-300`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${
                        game.gradient
                      } rounded-2xl blur-lg opacity-50 ${
                        game.status === "available"
                          ? "group-hover:opacity-75"
                          : ""
                      } transition-opacity duration-300`}
                    ></div>
                    <div
                      className={`relative bg-gradient-to-r ${game.gradient} p-3 md:p-4 rounded-2xl`}
                    >
                      <game.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {game.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-3 md:mb-4 leading-relaxed">
                    {game.description}
                  </p>

                  {/* Game Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Players:</span>
                      <span className="text-gray-300">{game.players}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Difficulty:</span>
                      <span
                        className={`${
                          game.difficulty === "Easy"
                            ? "text-green-400"
                            : game.difficulty === "Medium"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {game.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowGameInstructions(game)}
                      className="w-full py-2 px-4 bg-gray-700/50 text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-600/50 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Info className="w-4 h-4" />
                      How to Play
                    </button>

                    <button
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        game.status === "available"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                          : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={game.status !== "available"}
                      onClick={() => {
                        if (game.status === "available") {
                          setSelectedGame(game.id);
                          setTimeout(() => onGameSelect(game.id), 300);
                        }
                      }}
                    >
                      {game.status === "available" ? (
                        <>
                          <Play className="w-4 h-4" />
                          Play Now
                        </>
                      ) : (
                        <>
                          <Star className="w-4 h-4" />
                          Coming Soon
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              GameHub
            </span>
            ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="group">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full p-4 md:p-6 w-16 h-16 md:w-20 md:h-20 mx-auto group-hover:border-blue-500/50 transition-all duration-300">
                  <Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mx-auto" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                Sonic Powered
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                Lightning-fast transactions and minimal fees on the Sonic
                blockchain ensure smooth gaming experiences.
              </p>
            </div>

            <div className="group">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full p-4 md:p-6 w-16 h-16 md:w-20 md:h-20 mx-auto group-hover:border-blue-500/50 transition-all duration-300">
                  <Trophy className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mx-auto" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                Earn Rewards
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                Win games and earn cryptocurrency rewards in our play-to-earn
                ecosystem powered by Sonic.
              </p>
            </div>

            <div className="group">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full p-4 md:p-6 w-16 h-16 md:w-20 md:h-20 mx-auto group-hover:border-blue-500/50 transition-all duration-300">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mx-auto" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                Global Community
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                Join thousands of players worldwide in competitive multiplayer
                gaming on Sonic network.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Instructions Modal */}
      {showGameInstructions && (
        <GameInstructionsModal
          game={showGameInstructions}
          onClose={() => setShowGameInstructions(null)}
        />
      )}
    </div>
  );
};

export default LandingPage;
