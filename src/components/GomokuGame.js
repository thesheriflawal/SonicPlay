"use client";
import { useState, useEffect, useRef } from "react";
import { Users, Target } from "lucide-react";

const CONTRACT_ADDRESS = "0xac86A3888aec5cDF98c6cCeCD8975226F6A3D001";
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
        name: "blackPlayer",
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
        internalType: "uint8",
        name: "winner",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint8[10]",
        name: "winningCells",
        type: "uint8[10]",
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
        name: "blackPlayer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "whitePlayer",
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
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint8",
        name: "player",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "row",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "col",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "MoveMade",
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
        name: "whitePlayer",
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gameMoves",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "player",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "row",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "col",
        type: "uint8",
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
        name: "blackPlayer",
        type: "address",
      },
      {
        internalType: "address",
        name: "whitePlayer",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "currentPlayer",
        type: "uint8",
      },
      {
        internalType: "enum GomokuGame.GameStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "winner",
        type: "uint8",
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
        name: "moveCount",
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
        name: "blackPlayer",
        type: "address",
      },
      {
        internalType: "address",
        name: "whitePlayer",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "currentPlayer",
        type: "uint8",
      },
      {
        internalType: "enum GomokuGame.GameStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "winner",
        type: "uint8",
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
        name: "moveCount",
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
    name: "getGameBoard",
    outputs: [
      {
        internalType: "uint8[15][15]",
        name: "",
        type: "uint8[15][15]",
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
      {
        internalType: "uint8",
        name: "row",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "col",
        type: "uint8",
      },
    ],
    name: "makeMove",
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

const GomokuGame = ({
  contract,
  signer,
  roomId,
  gameId,
  playerAddress,
  playerNumber,
  players,
  gameState,
  onBackToLobby,
}) => {
  const [board, setBoard] = useState(
    Array(15)
      .fill()
      .map(() => Array(15).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winningCells, setWinningCells] = useState([]);
  const [timer, setTimer] = useState(300);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const timerRef = useRef(null);

  const myPlayerNumber = playerNumber;
  const myTurn = currentPlayer === myPlayerNumber && !gameOver;

  const renderCell = (row, col) => {
    const cellValue = board[row][col];
    const isEmpty = cellValue === 0;
    const isLastMove = lastMove && lastMove.row === row && lastMove.col === col;
    const isWinningCell = winningCells.some(([r, c]) => r === row && c === col);

    return (
      <button
        key={`${row}-${col}`}
        onClick={() => handleCellClick(row, col)}
        disabled={!myTurn || !isEmpty || isLoading}
        className={`
          w-8 h-8 border border-gray-600 transition-all duration-200 
          flex items-center justify-center relative
          ${isEmpty ? "bg-amber-100 hover:bg-amber-200" : "bg-amber-100"}
          ${
            myTurn && isEmpty
              ? "hover:border-blue-400 cursor-pointer"
              : "cursor-not-allowed"
          }
          ${isLastMove ? "ring-2 ring-yellow-400" : ""}
          ${isWinningCell ? "ring-2 ring-green-400" : ""}
        `}
      >
        {cellValue === 1 && (
          <div className="w-6 h-6 bg-black rounded-full shadow-lg"></div>
        )}
        {cellValue === 2 && (
          <div className="w-6 h-6 bg-white rounded-full shadow-lg border-2 border-gray-400"></div>
        )}
        {/* Grid intersection dot */}
        {isEmpty && (
          <div className="w-1 h-1 bg-gray-800 rounded-full absolute"></div>
        )}
      </button>
    );
  };

  const handleCellClick = async (row, col) => {
    if (!myTurn || board[row][col] !== 0 || isLoading) return;

    try {
      setIsLoading(true);
      setError("");

      const tx = await contract.makeMove(gameId, row, col);
      await tx.wait();

      setLastMove({ row, col });
    } catch (error) {
      console.error("Error making move:", error);
      setError("Failed to make move: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Event listeners
  useEffect(() => {
    if (!contract || !gameId) return;

    const handleMoveMade = (
      gameIdEvent,
      player,
      row,
      col,
      playerAddress,
      timestamp
    ) => {
      if (gameIdEvent.toString() === gameId.toString()) {
        setLastMove({ row: Number(row), col: Number(col) });
        fetchGameState();
      }
    };

    const handleGameFinished = (gameIdEvent, winnerNum, reason, winCells) => {
      if (gameIdEvent.toString() === gameId.toString()) {
        setWinner(Number(winnerNum));
        setGameOver(true);

        // Parse winning cells
        const cells = [];
        for (let i = 0; i < winCells.length; i += 2) {
          if (winCells[i] !== 0 || winCells[i + 1] !== 0) {
            cells.push([Number(winCells[i]), Number(winCells[i + 1])]);
          }
        }
        setWinningCells(cells);

        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    };

    try {
      contract.on("MoveMade", handleMoveMade);
      contract.on("GameFinished", handleGameFinished);
    } catch (error) {
      console.warn("Could not set up event listeners:", error);
    }

    return () => {
      try {
        contract.off("MoveMade", handleMoveMade);
        contract.off("GameFinished", handleGameFinished);
      } catch (error) {
        console.warn("Could not remove event listeners:", error);
      }
    };
  }, [contract, gameId]);

  const fetchGameState = async () => {
    try {
      const [
        id,
        blackPlayer,
        whitePlayer,
        currentPlayerFromContract,
        status,
        winnerFromContract,
        lastMoveTime,
        roomIdData,
        moveCount,
      ] = await contract.getGame(gameId);

      const boardData = await contract.getGameBoard(gameId);
      const convertedBoard = Array(15)
        .fill()
        .map(() => Array(15).fill(0));

      if (Array.isArray(boardData) && boardData.length === 15) {
        for (let row = 0; row < 15; row++) {
          for (let col = 0; col < 15; col++) {
            convertedBoard[row][col] = Number(boardData[row][col]);
          }
        }
      }

      setBoard(convertedBoard);
      setCurrentPlayer(Number(currentPlayerFromContract));

      if (Number(winnerFromContract) > 0) {
        setWinner(Number(winnerFromContract));
        setGameOver(true);
      }

      setGameOver(Number(status) >= 2);
    } catch (error) {
      console.error("Error fetching game state:", error);
      setError("Failed to fetch game state: " + error.message);
    }
  };

  useEffect(() => {
    if (contract && gameId) {
      fetchGameState();
    }
  }, [contract, gameId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">
                Gomoku (Five in a Row)
              </h1>
              <button
                onClick={onBackToLobby}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Lobby
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-600 rounded-lg">
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {/* Game Status */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                  {gameOver
                    ? winner === 0
                      ? "It's a Draw! 🤝"
                      : winner === playerNumber
                      ? "You Won! 🎉"
                      : "You Lost 😢"
                    : myTurn
                    ? "Your turn!"
                    : "Opponent's turn"}
                </h2>
                {!gameOver && (
                  <div className="text-white">
                    Time: {Math.floor(timer / 60)}:
                    {(timer % 60).toString().padStart(2, "0")}
                  </div>
                )}
              </div>

              {/* Current Player Indicator */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black rounded-full"></div>
                  <span
                    className={`text-white ${
                      currentPlayer === 1 ? "font-bold" : ""
                    }`}
                  >
                    Black {myPlayerNumber === 1 ? "(You)" : ""}
                  </span>
                </div>
                <div className="text-white">vs</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-400"></div>
                  <span
                    className={`text-white ${
                      currentPlayer === 2 ? "font-bold" : ""
                    }`}
                  >
                    White {myPlayerNumber === 2 ? "(You)" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Game Board */}
            <div className="flex justify-center mb-6 overflow-auto">
              <div className="bg-amber-200 p-4 rounded-lg shadow-2xl">
                <div
                  className="grid grid-cols-15 gap-0"
                  style={{ gridTemplateColumns: "repeat(15, 1fr)" }}
                >
                  {Array(15)
                    .fill(null)
                    .map((_, row) =>
                      Array(15)
                        .fill(null)
                        .map((_, col) => renderCell(row, col))
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Players
              </h3>
              <div className="space-y-2">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className={`flex items-center gap-2 p-2 rounded ${
                      player.id === playerAddress
                        ? "bg-blue-600"
                        : "bg-gray-700"
                    } ${
                      currentPlayer === player.playerNumber && !gameOver
                        ? "ring-2 ring-yellow-400"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        player.playerNumber === 1
                          ? "bg-black"
                          : "bg-white border-2 border-gray-400"
                      }`}
                    ></div>
                    <span className="text-white text-sm">
                      {player.username}{" "}
                      {player.id === playerAddress ? "(You)" : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Rules */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                How to Play
              </h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>• Get 5 stones in a row to win</p>
                <p>• Horizontal, vertical, or diagonal</p>
                <p>• Black plays first</p>
                <p>• No captures or special rules</p>
                <p>• First to 5 in a row wins!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GomokuGame;
