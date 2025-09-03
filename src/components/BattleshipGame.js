"use client";

import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import {
  Wallet,
  Users,
  Play,
  Copy,
  Check,
  AlertTriangle,
  User,
  Gamepad2,
  Crown,
  Target,
  Timer,
  Anchor,
  Crosshair,
  Ship,
} from "lucide-react";

const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "GameAbandoned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "roomId",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "GameCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "GameFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player2",
        type: "address",
      },
    ],
    name: "GameStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "PlayerJoined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sessionKey",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiryTime",
        type: "uint256",
      },
    ],
    name: "SessionKeyRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sessionKey",
        type: "address",
      },
    ],
    name: "SessionKeyRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "ShipsPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "position",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isHit",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ShotFired",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "checkGameTimeout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "roomId",
        type: "string",
      },
    ],
    name: "createGame",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "position",
        type: "uint8",
      },
    ],
    name: "fireShot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "forfeitGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gameShots",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "position",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "isHit",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "games",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player1",
        type: "address",
      },
      {
        internalType: "address",
        name: "player2",
        type: "address",
      },
      {
        internalType: "address",
        name: "currentPlayer",
        type: "address",
      },
      {
        internalType: "enum Battleship.GameStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lastMoveTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gameStartTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "roomId",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "player1ShipsPlaced",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "player2ShipsPlaced",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "player1ShipsRemaining",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "player2ShipsRemaining",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "getGame",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player1",
        type: "address",
      },
      {
        internalType: "address",
        name: "player2",
        type: "address",
      },
      {
        internalType: "address",
        name: "currentPlayer",
        type: "address",
      },
      {
        internalType: "uint8[100]",
        name: "player1Shots",
        type: "uint8[100]",
      },
      {
        internalType: "uint8[100]",
        name: "player2Shots",
        type: "uint8[100]",
      },
      {
        internalType: "enum Battleship.GameStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lastMoveTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "roomId",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "player1ShipsRemaining",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "player2ShipsRemaining",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "roomId",
        type: "string",
      },
    ],
    name: "getGameByRoomId",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "getGameShots",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "position",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isHit",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Battleship.Shot[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "getPlayerActiveGame",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "getPlayerGrid",
    outputs: [
      {
        internalType: "uint8[100]",
        name: "grid",
        type: "uint8[100]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sessionKeyAddr",
        type: "address",
      },
    ],
    name: "getSessionKey",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "expiryTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalGames",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "roomId",
        type: "string",
      },
    ],
    name: "joinGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "leaveGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "uint8[]",
        name: "positions",
        type: "uint8[]",
      },
    ],
    name: "placeShips",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "playerToActiveGame",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sessionKey",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "expiryTime",
        type: "uint256",
      },
    ],
    name: "registerSessionKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sessionKey",
        type: "address",
      },
    ],
    name: "revokeSessionKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "roomIdToGameId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "sessionKeys",
    outputs: [
      {
        internalType: "address",
        name: "sessionKey",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "expiryTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const CONTRACT_ADDRESS = "0x596C16D988E0c54b83Ba746973f1e1Acd0C09B43";

const SHIP_SIZES = [5, 4, 3, 3, 2];
const SHIP_NAMES = [
  "Carrier",
  "Battleship",
  "Cruiser",
  "Submarine",
  "Destroyer",
];

const playBeep = () => {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.log("Audio not supported");
  }
};

const ShipPlacement = ({ onShipsPlaced, playerName }) => {
  const [placedShips, setPlacedShips] = useState([]);
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [hoveredCells, setHoveredCells] = useState([]);
  const [error, setError] = useState("");

  const canPlaceShip = (startPos, size, horizontal) => {
    const row = Math.floor(startPos / 10);
    const col = startPos % 10;

    // Check if ship fits within grid
    if (horizontal && col + size > 10) return false;
    if (!horizontal && row + size > 10) return false;

    // Check for overlaps with existing ships
    for (let i = 0; i < size; i++) {
      const pos = horizontal ? startPos + i : startPos + i * 10;
      if (placedShips.includes(pos)) return false;
    }

    return true;
  };

  const getShipCells = (startPos, size, horizontal) => {
    const cells = [];
    for (let i = 0; i < size; i++) {
      cells.push(horizontal ? startPos + i : startPos + i * 10);
    }
    return cells;
  };

  const handleCellClick = (position) => {
    if (currentShipIndex >= SHIP_SIZES.length) return;

    const shipSize = SHIP_SIZES[currentShipIndex];

    if (!canPlaceShip(position, shipSize, isHorizontal)) {
      setError("Cannot place ship here!");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const shipCells = getShipCells(position, shipSize, isHorizontal);
    setPlacedShips([...placedShips, ...shipCells]);
    setCurrentShipIndex(currentShipIndex + 1);
    setError("");
  };

  const handleCellHover = (position) => {
    if (currentShipIndex >= SHIP_SIZES.length) return;

    const shipSize = SHIP_SIZES[currentShipIndex];

    if (canPlaceShip(position, shipSize, isHorizontal)) {
      setHoveredCells(getShipCells(position, shipSize, isHorizontal));
    } else {
      setHoveredCells([]);
    }
  };

  const resetPlacement = () => {
    setPlacedShips([]);
    setCurrentShipIndex(0);
    setHoveredCells([]);
    setError("");
  };

  const confirmPlacement = () => {
    if (placedShips.length === 17) {
      onShipsPlaced(placedShips);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Place Your Fleet
          </h1>
          <p className="text-gray-300">
            {playerName}, position your ships strategically
          </p>
        </div>

        {error && (
          <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ship Placement Grid */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Anchor className="w-5 h-5" />
              Your Fleet Deployment
            </h3>

            <div className="grid grid-cols-10 gap-1 mb-4 max-w-md mx-auto">
              {Array.from({ length: 100 }, (_, index) => {
                const isPlaced = placedShips.includes(index);
                const isHovered = hoveredCells.includes(index);

                return (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    onMouseEnter={() => handleCellHover(index)}
                    onMouseLeave={() => setHoveredCells([])}
                    className={`
                      w-8 h-8 border border-gray-600 transition-all duration-200
                      ${
                        isPlaced
                          ? "bg-blue-600"
                          : isHovered
                          ? "bg-blue-400"
                          : "bg-blue-200 hover:bg-blue-300"
                      }
                    `}
                  >
                    {isPlaced && (
                      <Ship className="w-4 h-4 text-white mx-auto" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setIsHorizontal(!isHorizontal)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isHorizontal ? "Horizontal" : "Vertical"}
              </button>

              <button
                onClick={resetPlacement}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>

            {placedShips.length === 17 && (
              <button
                onClick={confirmPlacement}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Confirm Fleet Placement
              </button>
            )}
          </div>

          {/* Ship List */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Fleet Composition</h3>

            <div className="space-y-3">
              {SHIP_SIZES.map((size, index) => (
                <div
                  key={index}
                  className={`
                    p-3 rounded-lg border-2 transition-colors
                    ${
                      index === currentShipIndex
                        ? "border-blue-500 bg-blue-900/50"
                        : index < currentShipIndex
                        ? "border-green-500 bg-green-900/50"
                        : "border-gray-600 bg-gray-700"
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      {SHIP_NAMES[index]}
                    </span>
                    <span className="text-gray-300">{size} cells</span>
                  </div>

                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: size }, (_, i) => (
                      <div
                        key={i}
                        className={`
                          w-4 h-4 border border-gray-500
                          ${
                            index < currentShipIndex
                              ? "bg-green-500"
                              : index === currentShipIndex
                              ? "bg-blue-500"
                              : "bg-gray-600"
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="text-gray-300 text-sm">
                Ships Placed: {Math.floor((placedShips.length / 17) * 5)}/5
              </div>
              <div className="text-gray-300 text-sm">
                Cells: {placedShips.length}/17
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BattleshipGame = ({
  contract,
  signer,
  roomId,
  gameId,
  playerAddress,
  players,
  gameState,
  onBackToLobby,
}) => {
  const [myShots, setMyShots] = useState(Array(100).fill(0)); // 0=empty, 2=miss, 3=hit
  const [opponentShots, setOpponentShots] = useState(Array(100).fill(0));
  const [currentPlayer, setCurrentPlayer] = useState(
    gameState?.currentPlayer || null
  );
  const [winner, setWinner] = useState(gameState?.winner || null);
  const [gameOver, setGameOver] = useState(gameState?.gameOver || false);
  const [shotHistory, setShotHistory] = useState(gameState?.shotHistory || []);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastShot, setLastShot] = useState(null);
  const [myShipsRemaining, setMyShipsRemaining] = useState(17);
  const [opponentShipsRemaining, setOpponentShipsRemaining] = useState(17);
  const timerRef = useRef(null);

  const isPlayer1 = playerAddress === players[0]?.id;
  const myTurn = currentPlayer === playerAddress && !gameOver;
  const opponent = players.find((p) => p.id !== playerAddress);

  // Timer effect
  useEffect(() => {
    if (!gameOver && myTurn) {
      setTimer(60);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameOver, myTurn]);

  // Event listeners
  useEffect(() => {
    if (!contract || !gameId) return;

    const handleShotFired = (
      gameIdEvent,
      player,
      position,
      isHit,
      timestamp
    ) => {
      if (gameIdEvent.toString() === gameId.toString()) {
        playBeep();

        const isMyShot = player === playerAddress;

        if (isMyShot) {
          // Update my shots grid
          setMyShots((prev) => {
            const newShots = [...prev];
            newShots[position] = isHit ? 3 : 2; // 3=hit, 2=miss
            return newShots;
          });

          if (isHit) {
            setOpponentShipsRemaining((prev) => prev - 1);
          }
        } else {
          // Update opponent's shots on my grid
          setOpponentShots((prev) => {
            const newShots = [...prev];
            newShots[position] = isHit ? 3 : 2;
            return newShots;
          });

          if (isHit) {
            setMyShipsRemaining((prev) => prev - 1);
          }
        }

        setLastShot({ position, isHit, player });

        setShotHistory((prev) => [
          ...prev,
          {
            player,
            position,
            isHit,
            timestamp: new Date(timestamp * 1000),
          },
        ]);

        // Switch turns only if miss
        if (!isHit) {
          setCurrentPlayer((prev) =>
            prev === players[0]?.id ? players[1]?.id : players[0]?.id
          );
        }
      }
    };

    const handleGameFinished = (gameIdEvent, winnerAddr, reason) => {
      if (gameIdEvent.toString() === gameId.toString()) {
        setWinner(winnerAddr);
        setGameOver(true);
        playBeep();
      }
    };

    contract.on("ShotFired", handleShotFired);
    contract.on("GameFinished", handleGameFinished);

    return () => {
      contract.off("ShotFired", handleShotFired);
      contract.off("GameFinished", handleGameFinished);
    };
  }, [contract, gameId, players, playerAddress]);

  const fireShot = async (position) => {
    if (!myTurn || myShots[position] !== 0 || isLoading) return;

    try {
      setIsLoading(true);
      setError("");

      const tx = await contract.fireShot(gameId, position);
      await tx.wait();
    } catch (error) {
      console.error("Error firing shot:", error);
      setError("Failed to fire shot. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const forfeitGame = async () => {
    try {
      setIsLoading(true);
      const tx = await contract.forfeitGame(gameId);
      await tx.wait();
    } catch (error) {
      console.error("Error forfeiting game:", error);
      setError("Failed to forfeit game.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderTargetGrid = () => {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Crosshair className="w-5 h-5" />
          Enemy Waters
        </h3>

        <div className="grid grid-cols-10 gap-1 max-w-md mx-auto">
          {myShots.map((cell, index) => {
            const isLastShot =
              lastShot?.position === index &&
              lastShot?.player === playerAddress;

            return (
              <button
                key={index}
                onClick={() => fireShot(index)}
                disabled={!myTurn || cell !== 0 || gameOver || isLoading}
                className={`
                  w-8 h-8 border border-gray-600 relative transition-all duration-200
                  ${
                    !myTurn || gameOver || cell !== 0
                      ? "cursor-not-allowed"
                      : "cursor-crosshair hover:bg-red-300"
                  }
                  ${
                    cell === 0
                      ? "bg-blue-400"
                      : cell === 2
                      ? "bg-gray-500"
                      : "bg-red-500"
                  }
                  ${isLastShot ? "ring-2 ring-yellow-400" : ""}
                `}
              >
                {cell === 2 && (
                  <div className="absolute inset-2 bg-white rounded-full" />
                )}
                {cell === 3 && (
                  <div className="absolute inset-1 bg-orange-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMyGrid = () => {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Anchor className="w-5 h-5" />
          Your Fleet
        </h3>

        <div className="grid grid-cols-10 gap-1 max-w-md mx-auto">
          {opponentShots.map((cell, index) => {
            const isLastShot =
              lastShot?.position === index &&
              lastShot?.player !== playerAddress;

            return (
              <div
                key={index}
                className={`
                  w-8 h-8 border border-gray-600 relative
                  ${
                    cell === 0
                      ? "bg-blue-600"
                      : cell === 2
                      ? "bg-blue-600"
                      : "bg-red-600"
                  }
                  ${isLastShot ? "ring-2 ring-yellow-400" : ""}
                `}
              >
                {cell === 2 && (
                  <div className="absolute inset-2 bg-white rounded-full" />
                )}
                {cell === 3 && (
                  <div className="absolute inset-1 bg-orange-400 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Error Toast */}
        {error && (
          <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 z-50 max-w-md">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError("")}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Battleship</h1>
          <p className="text-gray-300">Room: {roomId}</p>
        </div>

        {/* Game Status */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <div className="text-white font-semibold mb-2">
                {players[0]?.name || "Player 1"}
                {isPlayer1 && " (You)"}
              </div>
              <div className="text-sm text-gray-300">
                Ships: {isPlayer1 ? myShipsRemaining : opponentShipsRemaining}
                /17
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg text-white font-semibold">VS</div>
              {myTurn && !gameOver && (
                <div className="flex items-center gap-2 text-sm text-yellow-400 mt-1">
                  <Timer className="w-4 h-4" />
                  {timer}s
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="text-white font-semibold mb-2">
                {players[1]?.name || "Player 2"}
                {!isPlayer1 && " (You)"}
              </div>
              <div className="text-sm text-gray-300">
                Ships: {!isPlayer1 ? myShipsRemaining : opponentShipsRemaining}
                /17
              </div>
            </div>
          </div>

          {/* Current Turn Indicator */}
          {!gameOver && (
            <div className="text-center">
              {myTurn ? (
                <div className="text-green-400 font-semibold flex items-center justify-center gap-2">
                  <Target className="w-4 h-4" />
                  Your Turn - Fire!
                </div>
              ) : (
                <div className="text-gray-400">
                  {opponent?.name || "Opponent"}'s Turn
                </div>
              )}
            </div>
          )}

          {/* Game Over */}
          {gameOver && (
            <div className="text-center">
              {winner === playerAddress ? (
                <div className="text-green-400 font-bold text-xl flex items-center justify-center gap-2">
                  <Crown className="w-6 h-6" />
                  Victory! Enemy Fleet Destroyed!
                </div>
              ) : (
                <div className="text-red-400 font-bold text-xl">
                  Defeat! Your Fleet Was Sunk!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Game Grids */}
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {renderTargetGrid()}
          {renderMyGrid()}
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={onBackToLobby}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Lobby
          </button>

          {!gameOver && (
            <button
              onClick={forfeitGame}
              disabled={isLoading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "..." : "Surrender"}
            </button>
          )}
        </div>

        {/* Shot History */}
        {shotHistory.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Battle Log
            </h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {shotHistory.slice(-10).map((shot, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-300 flex justify-between"
                >
                  <span>
                    {shot.player === players[0]?.id
                      ? players[0]?.name
                      : players[1]?.name}{" "}
                    fired at ({Math.floor(shot.position / 10) + 1},
                    {(shot.position % 10) + 1})
                  </span>
                  <span
                    className={shot.isHit ? "text-red-400" : "text-blue-400"}
                  >
                    {shot.isHit ? "HIT!" : "Miss"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BattleshipLobby = () => {
  const [currentView, setCurrentView] = useState("username");
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [gameId, setGameId] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("MetaMask is not installed. Please install MetaMask to play.");
        return false;
      }

      setIsLoading(true);
      setConnectionStatus("connecting");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        setError("No accounts found. Please check MetaMask.");
        setConnectionStatus("error");
        return false;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const network = await provider.getNetwork();
      console.log("Connected to network:", network);

      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      setContract(contractInstance);
      setProvider(provider);
      setSigner(signer);
      setUserAddress(address);
      setConnectionStatus("connected");
      setError("");

      console.log("Connected to Web3:", address);
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      let errorMessage = "Failed to connect wallet";

      if (error.code === 4001) {
        errorMessage = "Connection rejected by user";
      } else if (error.code === -32002) {
        errorMessage = "Connection request pending. Please check MetaMask.";
      } else if (error.message?.includes("network")) {
        errorMessage = "Network error. Please check your connection.";
      }

      setError(errorMessage);
      setConnectionStatus("error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    if (connectionStatus !== "connected") {
      const connected = await connectWallet();
      if (!connected) return;
    }

    setCurrentView("home");
  };

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createRoom = async () => {
    if (!contract || connectionStatus !== "connected") {
      setError("Please connect your wallet first");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const newRoomId = generateRoomId();
      const tx = await contract.createGame(newRoomId);
      const receipt = await tx.wait();

      // Extract game ID from events
      const gameCreatedEvent = receipt.logs.find((log) => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed.name === "GameCreated";
        } catch {
          return false;
        }
      });

      if (gameCreatedEvent) {
        const parsed = contract.interface.parseLog(gameCreatedEvent);
        const newGameId = parsed.args.gameId;

        setGameId(newGameId);
        setRoomId(newRoomId);
        setPlayers([{ id: userAddress, name: username }]);
        setCurrentView("waiting");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      setError("Failed to create room. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const joinRoom = async () => {
    if (!contract || !joinRoomId.trim() || connectionStatus !== "connected") {
      setError("Please enter a valid room ID and connect your wallet");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const tx = await contract.joinGame(joinRoomId.toUpperCase());
      await tx.wait();

      // Get game details
      const gameIdFromRoom = await contract.getGameByRoomId(
        joinRoomId.toUpperCase()
      );
      const gameDetails = await contract.getGame(gameIdFromRoom);

      setGameId(gameIdFromRoom);
      setRoomId(joinRoomId.toUpperCase());
      setPlayers([
        { id: gameDetails.player1, name: "Player 1" },
        { id: userAddress, name: username },
      ]);
      setCurrentView("shipPlacement");
    } catch (error) {
      console.error("Error joining room:", error);
      if (error.message?.includes("Room does not exist")) {
        setError("Room not found. Please check the room ID.");
      } else if (error.message?.includes("Game not available")) {
        setError("Game is no longer available to join.");
      } else {
        setError("Failed to join room. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleShipsPlaced = async (shipPositions) => {
    try {
      setIsLoading(true);
      setError("");

      const tx = await contract.placeShips(gameId, shipPositions);
      await tx.wait();

      setCurrentView("waitingForGame");
    } catch (error) {
      console.error("Error placing ships:", error);
      setError("Failed to place ships. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const backToLobby = () => {
    setCurrentView("home");
    setRoomId("");
    setJoinRoomId("");
    setGameId(null);
    setPlayers([]);
    setGameState(null);
  };

  const retryConnection = async () => {
    setError("");
    await connectWallet();
  };

  // Event listeners for game events
  useEffect(() => {
    if (!contract) return;

    const handlePlayerJoined = (gameIdEvent, player) => {
      if (gameIdEvent.toString() === gameId?.toString()) {
        setPlayers((prev) => [...prev, { id: player, name: "Player 2" }]);
        setCurrentView("shipPlacement");
      }
    };

    const handleGameStarted = (gameIdEvent, player1, player2) => {
      if (gameIdEvent.toString() === gameId?.toString()) {
        setGameState({
          currentPlayer: player1,
          gameOver: false,
          shotHistory: [],
        });
        setCurrentView("game");
      }
    };

    contract.on("PlayerJoined", handlePlayerJoined);
    contract.on("GameStarted", handleGameStarted);

    return () => {
      contract.off("PlayerJoined", handlePlayerJoined);
      contract.off("GameStarted", handleGameStarted);
    };
  }, [contract, gameId]);

  if (currentView === "shipPlacement") {
    return (
      <ShipPlacement onShipsPlaced={handleShipsPlaced} playerName={username} />
    );
  }

  if (currentView === "game") {
    return (
      <BattleshipGame
        contract={contract}
        signer={signer}
        roomId={roomId}
        gameId={gameId}
        playerAddress={userAddress}
        players={players}
        gameState={gameState}
        onBackToLobby={backToLobby}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Battleship Game Hub
          </h1>
          <p className="text-gray-300 mb-4">
            Naval Strategy - Sink the Enemy Fleet
          </p>
          <div className="flex items-center justify-center gap-2 text-white">
            {connectionStatus === "connected" ? (
              <Wallet className="w-5 h-5 text-green-500" />
            ) : connectionStatus === "connecting" ? (
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            )}
            <span>
              {connectionStatus === "connecting"
                ? "Connecting..."
                : connectionStatus.charAt(0).toUpperCase() +
                  connectionStatus.slice(1)}
            </span>
            {userAddress && (
              <span className="text-gray-300 text-sm ml-2">
                ({userAddress.slice(0, 6)}...{userAddress.slice(-4)})
              </span>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 z-50 max-w-md">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
            {connectionStatus === "error" && (
              <button
                onClick={retryConnection}
                className="ml-4 px-2 py-1 bg-white text-red-500 rounded hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                Retry
              </button>
            )}
            <button
              onClick={() => setError("")}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}

        {/* Username View */}
        {currentView === "username" && (
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-6 h-6" />
              Enter Admiral Name
            </h2>
            <form onSubmit={handleUsernameSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your admiral name"
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                maxLength={20}
                required
              />
              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !username.trim()}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Wallet className="w-5 h-5" />
                )}
                {connectionStatus === "connected"
                  ? "Continue"
                  : "Connect Wallet"}
              </button>
            </form>
            {connectionStatus === "disconnected" && (
              <p className="text-gray-400 text-sm mt-2 text-center">
                MetaMask required to play
              </p>
            )}
          </div>
        )}

        {/* Home View */}
        {currentView === "home" && (
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6" />
              Naval Command
            </h2>
            <div className="space-y-4">
              <button
                onClick={createRoom}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={connectionStatus !== "connected" || isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                Create Battle
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">or</span>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())}
                  placeholder="Enter Battle ID"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  maxLength={6}
                />
                <button
                  onClick={joinRoom}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    connectionStatus !== "connected" ||
                    isLoading ||
                    !joinRoomId.trim()
                  }
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Users className="w-5 h-5" />
                  )}
                  Join Battle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Waiting View */}
        {(currentView === "waiting" || currentView === "waitingForGame") && (
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              {currentView === "waiting"
                ? "Waiting for Admiral"
                : "Preparing for Battle"}
            </h2>

            {currentView === "waiting" && (
              <>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {roomId}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Share this Battle ID with your opponent
                  </p>

                  <button
                    onClick={copyRoomId}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy Battle ID"}
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white">{username} (You)</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg opacity-50">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                    <span className="text-gray-400">
                      Waiting for opponent...
                    </span>
                  </div>
                </div>
              </>
            )}

            {currentView === "waitingForGame" && (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-300">
                  Fleet deployed! Waiting for opponent to position their
                  ships...
                </p>
              </div>
            )}

            <button
              onClick={backToLobby}
              className="mt-6 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Command
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleshipLobby;
