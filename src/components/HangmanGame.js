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
  BookOpen,
  Trophy,
  Heart,
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
        name: "wordSetter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "wordLength",
        type: "uint8",
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
      {
        indexed: false,
        internalType: "string",
        name: "finalWord",
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
        name: "wordSetter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "guesser",
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
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "letter",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isCorrect",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "string",
        name: "revealedWord",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "wrongGuesses",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "GuessMade",
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
        name: "guesser",
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
      {
        internalType: "string",
        name: "word",
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
    name: "gameGuesses",
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
        internalType: "string",
        name: "letter",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isCorrect",
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
        name: "guesser",
        type: "address",
      },
      {
        internalType: "address",
        name: "wordSetter",
        type: "address",
      },
      {
        internalType: "string",
        name: "wordHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "revealedWord",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "wrongGuesses",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "guessedLetters",
        type: "string",
      },
      {
        internalType: "enum Hangman.GameStatus",
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
        name: "lastGuessTime",
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
        name: "totalGuesses",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "wordLength",
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
        name: "wordSetter",
        type: "address",
      },
      {
        internalType: "address",
        name: "guesser",
        type: "address",
      },
      {
        internalType: "string",
        name: "revealedWord",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "wrongGuesses",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "guessedLetters",
        type: "string",
      },
      {
        internalType: "enum Hangman.GameStatus",
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
        name: "lastGuessTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "roomId",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "totalGuesses",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "wordLength",
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
    name: "getGameGuesses",
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
            internalType: "string",
            name: "letter",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isCorrect",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Hangman.Guess[]",
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
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "getGameState",
    outputs: [
      {
        internalType: "string",
        name: "revealedWord",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "wrongGuesses",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "guessedLetters",
        type: "string",
      },
      {
        internalType: "enum Hangman.GameStatus",
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
        name: "timeRemaining",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "wordLength",
        type: "uint8",
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
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "letter",
        type: "string",
      },
    ],
    name: "makeGuess",
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

const CONTRACT_ADDRESS = "0x5eCE8Ab81F428A52189c34d1e9d7050392CDeb43";

const HANGMAN_STAGES = [
  `
   +---+
   |   |
       |
       |
       |
       |
=========`,
  `
   +---+
   |   |
   O   |
       |
       |
       |
=========`,
  `
   +---+
   |   |
   O   |
   |   |
       |
       |
=========`,
  `
   +---+
   |   |
   O   |
  /|   |
       |
       |
=========`,
  `
   +---+
   |   |
   O   |
  /|\\  |
       |
       |
=========`,
  `
   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
=========`,
  `
   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
=========`,
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

const HangmanGame = ({
  contract,
  signer,
  roomId,
  gameId,
  playerAddress,
  playerRole,
  players,
  gameState,
  onBackToLobby,
}) => {
  const [revealedWord, setRevealedWord] = useState(
    gameState?.revealedWord || ""
  );
  const [wrongGuesses, setWrongGuesses] = useState(
    gameState?.wrongGuesses || 0
  );
  const [guessedLetters, setGuessedLetters] = useState(
    gameState?.guessedLetters || ""
  );
  const [winner, setWinner] = useState(gameState?.winner || null);
  const [gameOver, setGameOver] = useState(gameState?.gameOver || false);
  const [guessHistory, setGuessHistory] = useState(
    gameState?.guessHistory || []
  );
  const [timer, setTimer] = useState(300);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentGuess, setCurrentGuess] = useState("");
  const [wordLength, setWordLength] = useState(gameState?.wordLength || 0);
  const timerRef = useRef(null);

  const isGuesser = playerRole === "guesser";
  const myTurn = isGuesser && !gameOver;
  const opponent = players.find((p) => p.id !== playerAddress);

  // Timer effect
  useEffect(() => {
    if (!gameOver && isGuesser) {
      setTimer(300);
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
  }, [gameOver, isGuesser]);

  // Event listeners
  useEffect(() => {
    if (!contract || !gameId) return;

    const handleGuessMade = (
      gameIdEvent,
      player,
      letter,
      isCorrect,
      newRevealedWord,
      newWrongGuesses,
      timestamp
    ) => {
      if (gameIdEvent.toString() === gameId.toString()) {
        console.log("Guess made event received:", {
          player,
          letter,
          isCorrect,
        });
        setRevealedWord(newRevealedWord);
        setWrongGuesses(Number(newWrongGuesses));
        setGuessedLetters((prev) => prev + letter);

        playBeep();

        const playerName = getPlayerName(player);
        setGuessHistory((prev) => [
          ...prev,
          {
            player: player,
            letter: letter,
            isCorrect: isCorrect,
            playerName,
            timestamp,
          },
        ]);
      }
    };

    const handleGameFinished = (gameIdEvent, winner, reason, finalWord) => {
      if (gameIdEvent.toString() === gameId.toString()) {
        console.log("Game finished event received:", {
          winner,
          reason,
          finalWord,
        });
        setWinner(winner);
        setGameOver(true);
        setRevealedWord(finalWord);

        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    };

    const handlePlayerJoined = (gameIdEvent, playerAddress) => {
      if (gameIdEvent.toString() === gameId.toString()) {
        console.log("Player joined event received:", { playerAddress });
        fetchGameState();
      }
    };

    try {
      contract.on("GuessMade", handleGuessMade);
      contract.on("GameFinished", handleGameFinished);
      contract.on("PlayerJoined", handlePlayerJoined);
    } catch (error) {
      console.warn("Could not set up event listeners:", error);
    }

    return () => {
      try {
        contract.off("GuessMade", handleGuessMade);
        contract.off("GameFinished", handleGameFinished);
        contract.off("PlayerJoined", handlePlayerJoined);
      } catch (error) {
        console.warn("Could not remove event listeners:", error);
      }
    };
  }, [contract, gameId]);

  // Fetch game state from contract
  const fetchGameState = async () => {
    try {
      console.log("Fetching game state for gameId:", gameId);
      const [
        revealedWordFromContract,
        wrongGuessesFromContract,
        guessedLettersFromContract,
        status,
        winnerFromContract,
        timeRemaining,
        wordLengthFromContract,
      ] = await contract.getGameState(gameId);

      console.log("Game state from contract:", {
        revealedWordFromContract,
        wrongGuessesFromContract,
        guessedLettersFromContract,
        status,
        winnerFromContract,
      });

      setRevealedWord(revealedWordFromContract);
      setWrongGuesses(Number(wrongGuessesFromContract));
      setGuessedLetters(guessedLettersFromContract);
      setWordLength(Number(wordLengthFromContract));

      if (winnerFromContract !== ethers.ZeroAddress) {
        setWinner(winnerFromContract);
        setGameOver(true);
      }

      setGameOver(Number(status) >= 2);
    } catch (error) {
      console.error("Error fetching game state:", error);
      setError("Failed to fetch game state: " + error.message);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (contract && gameId) {
      fetchGameState();
    }
  }, [contract, gameId]);

  // Periodic refresh
  useEffect(() => {
    if (contract && gameId && !gameOver) {
      const interval = setInterval(() => {
        console.log("Periodic game state refresh");
        fetchGameState();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [contract, gameId, gameOver]);

  const handleGuessSubmit = async (e) => {
    e.preventDefault();

    if (
      !myTurn ||
      gameOver ||
      !contract ||
      !gameId ||
      isLoading ||
      !currentGuess
    ) {
      return;
    }

    const letter = currentGuess.toLowerCase();

    if (!/^[a-z]$/.test(letter)) {
      setError("Please enter a single letter!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (guessedLetters.includes(letter)) {
      setError("Letter already guessed!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Making guess:", { gameId, letter });

      const gasEstimate = await contract.makeGuess.estimateGas(gameId, letter);
      const gasLimit = Math.floor(Number(gasEstimate) * 1.2);

      const tx = await contract.makeGuess(gameId, letter, {
        gasLimit: gasLimit,
      });

      setError("Transaction submitted... waiting for confirmation");
      setCurrentGuess("");

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      setError("");
    } catch (error) {
      console.error("Error making guess:", error);
      let errorMessage = "Failed to make guess";

      if (error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled by user";
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for gas";
      } else if (error.message.includes("execution reverted")) {
        errorMessage =
          "Guess not allowed - " + (error.reason || "check game state");
      } else {
        errorMessage = "Error: " + (error.message || "Unknown error");
      }

      setError(errorMessage);
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlayerName = (playerAddress) => {
    const player = players.find(
      (p) => p.id.toLowerCase() === playerAddress.toLowerCase()
    );
    return player ? player.username : `Player ${playerAddress.slice(0, 6)}`;
  };

  const renderAlphabet = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return (
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 mb-6">
        {alphabet.split("").map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect =
            isGuessed && revealedWord.toLowerCase().includes(letter);
          const isWrong =
            isGuessed && !revealedWord.toLowerCase().includes(letter);

          return (
            <button
              key={letter}
              onClick={() => setCurrentGuess(letter)}
              disabled={isGuessed || !myTurn || gameOver || isLoading}
              className={`
                w-8 h-8 sm:w-10 sm:h-10 border-2 rounded-lg font-bold text-sm sm:text-base
                transition-all duration-200
                ${isCorrect ? "bg-green-500 text-white border-green-600" : ""}
                ${isWrong ? "bg-red-500 text-white border-red-600" : ""}
                ${
                  !isGuessed && myTurn && !gameOver
                    ? "bg-white hover:bg-blue-100 border-gray-300 cursor-pointer"
                    : ""
                }
                ${
                  !isGuessed && (!myTurn || gameOver)
                    ? "bg-gray-200 border-gray-300 cursor-not-allowed"
                    : ""
                }
                ${currentGuess === letter ? "ring-2 ring-blue-400" : ""}
              `}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </div>
    );
  };

  const renderWord = () => {
    return (
      <div className="flex justify-center gap-2 mb-6">
        {revealedWord.split("").map((letter, index) => (
          <div
            key={index}
            className="w-8 h-10 sm:w-10 sm:h-12 border-b-4 border-gray-600 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white"
          >
            {letter === "_" ? "" : letter.toUpperCase()}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Error Toast */}
        {error && (
          <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 z-50 max-w-md">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError("")}
              className="ml-2 text-white hover:text-gray-200 flex-shrink-0"
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBackToLobby}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            ← Back to Lobby
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Hangman</h1>
            <p className="text-blue-200">Room: {roomId}</p>
          </div>
          <div className="text-right">
            <div className="text-white text-sm">
              Players: {players.length}/2
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Area */}
          <div className="lg:col-span-3">
            {/* Game Status */}
            <div className="text-center mb-6">
              {gameOver ? (
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  {winner ? (
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-400">
                      <Trophy className="w-8 h-8 animate-pulse" />
                      {winner.toLowerCase() === playerAddress.toLowerCase()
                        ? "You Win!"
                        : `${getPlayerName(winner)} Wins!`}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-400">
                      Game Over!
                    </div>
                  )}
                  <button
                    onClick={onBackToLobby}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Back to Lobby
                  </button>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 text-xl font-semibold text-white">
                    {myTurn ? (
                      <>
                        <Target className="w-6 h-6 text-yellow-400 animate-pulse" />
                        Your Turn - Guess a Letter
                        {isLoading && (
                          <span className="text-blue-400 ml-2 animate-spin">
                            ⟳
                          </span>
                        )}
                        <span
                          className={`ml-2 ${
                            timer <= 10
                              ? "text-red-400 animate-pulse"
                              : "text-yellow-400"
                          }`}
                        >
                          {timer}s
                        </span>
                      </>
                    ) : (
                      <>
                        <Crown className="w-6 h-6 text-purple-400" />
                        {isGuesser
                          ? "Waiting for word..."
                          : "Waiting for guess..."}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Hangman Drawing */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
                <pre className="text-white font-mono text-sm sm:text-base leading-tight">
                  {
                    HANGMAN_STAGES[
                      Math.min(wrongGuesses, HANGMAN_STAGES.length - 1)
                    ]
                  }
                </pre>
                <div className="text-center mt-4">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>Lives: {6 - wrongGuesses}/6</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Word Display */}
            {renderWord()}

            {/* Alphabet Grid */}
            {renderAlphabet()}

            {/* Guess Input */}
            {myTurn && !gameOver && (
              <form
                onSubmit={handleGuessSubmit}
                className="flex justify-center gap-2 mb-6"
              >
                <input
                  type="text"
                  value={currentGuess}
                  onChange={(e) =>
                    setCurrentGuess(e.target.value.toLowerCase())
                  }
                  placeholder="Enter a letter"
                  maxLength={1}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 text-center text-xl font-bold w-16"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!currentGuess || isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "..." : "Guess"}
                </button>
              </form>
            )}

            {/* Player Info */}
            <div className="flex justify-between">
              <div
                className={`p-4 rounded-lg ${
                  playerRole === "wordSetter" ? "bg-purple-600" : "bg-gray-700"
                } ${!isGuesser && !gameOver ? "ring-2 ring-white" : ""}`}
              >
                <div className="flex items-center gap-2 text-white">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">
                    Word Setter {playerRole === "wordSetter" ? "(You)" : ""}
                  </span>
                </div>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  playerRole === "guesser" ? "bg-green-600" : "bg-gray-700"
                } ${isGuesser && !gameOver ? "ring-2 ring-white" : ""}`}
              >
                <div className="flex items-center gap-2 text-white">
                  <Target className="w-5 h-5" />
                  <span className="font-semibold">
                    Guesser {playerRole === "guesser" ? "(You)" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Players List */}
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
                      player.role === "guesser" && myTurn && !gameOver
                        ? "ring-2 ring-yellow-400"
                        : ""
                    }`}
                  >
                    {player.role === "guesser" ? (
                      <Target className="w-4 h-4 text-green-500" />
                    ) : (
                      <BookOpen className="w-4 h-4 text-purple-500" />
                    )}
                    <span className="text-white text-sm">
                      {player.username}{" "}
                      {player.id === playerAddress ? "(You)" : ""}
                    </span>
                    {player.role === "guesser" && myTurn && !gameOver && (
                      <Crown className="w-4 h-4 text-yellow-400 ml-auto" />
                    )}
                  </div>
                ))}
                {players.length < 2 && (
                  <div className="flex items-center gap-2 p-2 rounded bg-gray-700 opacity-50">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span className="text-gray-400 text-sm">
                      Waiting for player...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4">Game Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Word Length:</span>
                  <span className="text-white">{wordLength} letters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Wrong Guesses:</span>
                  <span className="text-white">{wrongGuesses}/6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Guesses:</span>
                  <span className="text-white">{guessHistory.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span
                    className={`font-medium ${
                      gameOver ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {gameOver ? "Finished" : "Active"}
                  </span>
                </div>
              </div>
            </div>

            {/* Guess History */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Guess History</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {guessHistory.length === 0 ? (
                  <p className="text-gray-400 text-sm">No guesses yet</p>
                ) : (
                  guessHistory.slice(-10).map((guess, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          guess.isCorrect
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {guess.letter.toUpperCase()}
                      </span>
                      <span className="text-white">
                        {guess.isCorrect ? "✓" : "✗"}
                      </span>
                      <span className="text-gray-400 ml-auto text-xs">
                        #{index + 1}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HangmanLobby = () => {
  const [currentView, setCurrentView] = useState("username");
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [word, setWord] = useState("");
  const [playerRole, setPlayerRole] = useState(null);
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
      } else {
        errorMessage =
          "Failed to connect wallet: " + (error.message || "Unknown error");
      }

      setError(errorMessage);
      setConnectionStatus("error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }

    const autoConnect = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (error) {
          console.log("Auto-connect failed:", error);
        }
      }
    };

    autoConnect();

    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          setConnectionStatus("disconnected");
          setUserAddress("");
          setContract(null);
          setSigner(null);
          setProvider(null);
        } else {
          connectWallet();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, []);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a valid username");
      return;
    }

    if (connectionStatus !== "connected") {
      const connected = await connectWallet();
      if (!connected) return;
    }

    setCurrentView("home");
  };

  const createRoom = async () => {
    if (!contract || !username.trim() || !word.trim()) {
      setError("Wallet not connected, invalid username, or no word provided");
      return;
    }

    if (word.length < 3 || word.length > 20) {
      setError("Word must be between 3 and 20 characters");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(word)) {
      setError("Word must contain only letters");
      return;
    }

    try {
      const playerActiveGame = await contract.getPlayerActiveGame(userAddress);
      if (playerActiveGame && playerActiveGame.toString() !== "0") {
        setError(
          "You are already in an active game. Please finish or leave your current game first."
        );
        return;
      }
    } catch (error) {
      console.log("Could not check existing game, proceeding with creation");
    }

    setIsLoading(true);
    setError("");

    try {
      const roomIdGenerated = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      console.log("Creating room with ID:", roomIdGenerated, "and word:", word);

      const gasEstimate = await contract.createGame.estimateGas(
        roomIdGenerated,
        word
      );
      const gasLimit = Math.floor(Number(gasEstimate) * 1.2);

      const tx = await contract.createGame(roomIdGenerated, word, {
        gasLimit: gasLimit,
      });

      setError("Creating room... please wait for transaction confirmation");

      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
      console.log("Room created, receipt:", receipt);

      let gameCreatedEvent;
      if (receipt.logs) {
        for (const log of receipt.logs) {
          try {
            const parsedLog = contract.interface.parseLog({
              topics: log.topics,
              data: log.data,
            });
            if (parsedLog && parsedLog.name === "GameCreated") {
              gameCreatedEvent = parsedLog;
              break;
            }
          } catch (e) {
            continue;
          }
        }
      }

      if (gameCreatedEvent) {
        const gameIdFromEvent = gameCreatedEvent.args.gameId;
        setRoomId(roomIdGenerated);
        setGameId(gameIdFromEvent);
        setPlayerRole("wordSetter");
        setPlayers([
          { id: userAddress, username: username, role: "wordSetter" },
        ]);
        setCurrentView("waiting");
        setError("");

        const handlePlayerJoined = (gameId, guesserAddress) => {
          if (gameId.toString() === gameIdFromEvent.toString()) {
            setPlayers((prev) => [
              ...prev,
              { id: guesserAddress, username: "Guesser", role: "guesser" },
            ]);
            setCurrentView("game");
            contract.off("PlayerJoined", handlePlayerJoined);
          }
        };

        contract.on("PlayerJoined", handlePlayerJoined);
      } else {
        try {
          const gameIdFromContract = await contract.getGameByRoomId(
            roomIdGenerated
          );
          if (gameIdFromContract && gameIdFromContract.toString() !== "0") {
            setRoomId(roomIdGenerated);
            setGameId(gameIdFromContract);
            setPlayerRole("wordSetter");
            setPlayers([
              { id: userAddress, username: username, role: "wordSetter" },
            ]);
            setCurrentView("waiting");
            setError("");
          } else {
            throw new Error("Game not found after creation");
          }
        } catch (fallbackError) {
          console.error("Fallback failed:", fallbackError);
          setError(
            "Room created but couldn't retrieve game ID. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error creating room:", error);
      let errorMessage = "Failed to create room";

      if (error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled by user";
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for gas";
      } else if (error.message.includes("execution reverted")) {
        errorMessage =
          "Contract error: " + (error.reason || "Please try again");
      } else {
        errorMessage =
          "Failed to create room: " + (error.message || "Unknown error");
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const joinRoom = async () => {
    if (!contract || !joinRoomId.trim() || !username.trim()) {
      setError("Please enter a valid room ID and username");
      return;
    }

    try {
      const playerActiveGame = await contract.getPlayerActiveGame(userAddress);
      if (playerActiveGame && playerActiveGame.toString() !== "0") {
        const existingGameData = await contract.getGame(playerActiveGame);
        const [, wordSetter, guesser, , , , status] = existingGameData;

        if (status < 2) {
          const players = [
            {
              id: wordSetter,
              username: wordSetter === userAddress ? username : "Word Setter",
              role: "wordSetter",
            },
          ];

          if (guesser !== ethers.ZeroAddress) {
            players.push({
              id: guesser,
              username: guesser === userAddress ? username : "Guesser",
              role: "guesser",
            });
            setCurrentView("game");
          } else {
            setCurrentView("waiting");
          }

          setPlayerRole(wordSetter === userAddress ? "wordSetter" : "guesser");
          setPlayers(players);
          setGameId(playerActiveGame);
          setIsLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log("Could not check existing game, proceeding with join");
    }

    setIsLoading(true);
    setError("");

    try {
      const roomIdToJoin = joinRoomId.trim().toUpperCase();
      console.log("Trying to join room:", roomIdToJoin);

      const gameIdToJoin = await contract.getGameByRoomId(roomIdToJoin);
      if (!gameIdToJoin || gameIdToJoin.toString() === "0") {
        setError("Room not found. Please check the room ID.");
        return;
      }

      const gameData = await contract.getGame(gameIdToJoin);
      const [id, wordSetter, guesser] = gameData;

      if (guesser !== ethers.ZeroAddress) {
        setError("Room is already full");
        return;
      }

      if (wordSetter.toLowerCase() === userAddress.toLowerCase()) {
        setError("You cannot join your own room");
        return;
      }

      const gasEstimate = await contract.joinGame.estimateGas(roomIdToJoin);
      const gasLimit = Math.floor(Number(gasEstimate) * 1.2);

      const tx = await contract.joinGame(roomIdToJoin, {
        gasLimit: gasLimit,
      });

      setError("Joining room... please wait for transaction confirmation");

      await tx.wait();

      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
      console.log("Successfully joined room");

      const updatedGameData = await contract.getGame(gameIdToJoin);
      const [, updatedWordSetter, updatedGuesser] = updatedGameData;

      setPlayers([
        { id: updatedWordSetter, username: "Word Setter", role: "wordSetter" },
        { id: userAddress, username: username, role: "guesser" },
      ]);

      setRoomId(roomIdToJoin);
      setGameId(gameIdToJoin);
      setPlayerRole("guesser");
      setCurrentView("game");
      setError("");
    } catch (error) {
      console.error("Error joining room:", error);
      let errorMessage = "Failed to join room";

      if (error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled by user";
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for gas";
      } else if (error.message.includes("execution reverted")) {
        if (error.message.includes("Game is full")) {
          errorMessage = "Room is already full";
        } else if (error.message.includes("Room does not exist")) {
          errorMessage = "Room not found";
        } else {
          errorMessage =
            "Cannot join room: " + (error.reason || "Please try again");
        }
      } else {
        errorMessage =
          "Failed to join room: " + (error.message || "Unknown error");
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ... existing code for rejoinCurrentGame, leaveCurrentGame, copyRoomId, backToLobby, retryConnection ...

  const rejoinCurrentGame = async () => {
    if (!contract || !userAddress) {
      setError("Wallet not connected");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const playerActiveGame = await contract.getPlayerActiveGame(userAddress);
      if (!playerActiveGame || playerActiveGame.toString() === "0") {
        setError("You are not in any active game");
        setIsLoading(false);
        return;
      }

      const gameData = await contract.getGame(playerActiveGame);
      const [id, wordSetter, guesser, , , , status] = gameData;

      if (status >= 2) {
        setError("Your previous game has already ended");
        setIsLoading(false);
        return;
      }

      const gameInfo = await contract.games(playerActiveGame);
      const roomIdFromContract = gameInfo.roomId;

      const players = [
        {
          id: wordSetter,
          username: wordSetter === userAddress ? username : "Word Setter",
          role: "wordSetter",
        },
      ];

      if (guesser !== ethers.ZeroAddress) {
        players.push({
          id: guesser,
          username: guesser === userAddress ? username : "Guesser",
          role: "guesser",
        });
      }

      setPlayers(players);
      setRoomId(roomIdFromContract);
      setGameId(playerActiveGame);
      setPlayerRole(wordSetter === userAddress ? "wordSetter" : "guesser");
      setCurrentView(guesser !== ethers.ZeroAddress ? "game" : "waiting");
      setError("");
    } catch (error) {
      console.error("Error rejoining game:", error);
      setError("Failed to rejoin game: " + (error.message || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const leaveCurrentGame = async () => {
    if (!contract || !userAddress) {
      setError("Wallet not connected");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const playerActiveGame = await contract.getPlayerActiveGame(userAddress);
      if (!playerActiveGame || playerActiveGame.toString() === "0") {
        setError("You are not in any active game");
        setIsLoading(false);
        return;
      }

      const tx = await contract.leaveGame(playerActiveGame);
      setError("Leaving game... please wait for confirmation");

      await tx.wait();
      setError("Successfully left the game");
      setTimeout(() => setError(""), 3000);
    } catch (error) {
      console.error("Error leaving game:", error);
      let errorMessage = "Failed to leave game";

      if (error.message.includes("Cannot leave active game")) {
        errorMessage =
          "Cannot leave an active game. You need to forfeit the game instead.";
      } else if (error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled by user";
      } else {
        errorMessage =
          "Failed to leave game: " + (error.message || "Unknown error");
      }

      setError(errorMessage);
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
      console.error("Failed to copy room ID:", error);
      const textArea = document.createElement("textarea");
      textArea.value = roomId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const backToLobby = () => {
    if (contract) {
      try {
        contract.removeAllListeners();
      } catch (error) {
        console.warn("Could not remove contract listeners:", error);
      }
    }

    setCurrentView("home");
    setRoomId("");
    setPlayerRole(null);
    setPlayers([]);
    setGameState(null);
    setJoinRoomId("");
    setGameId(null);
    setWord("");
    setError("");
  };

  const retryConnection = () => {
    setError("");
    connectWallet();
  };

  if (currentView === "game") {
    return (
      <HangmanGame
        contract={contract}
        signer={signer}
        roomId={roomId}
        gameId={gameId}
        playerAddress={userAddress}
        playerRole={playerRole}
        players={players}
        gameState={gameState}
        onBackToLobby={backToLobby}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Hangman Hub
          </h1>
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
              Enter Username
            </h2>
            <form onSubmit={handleUsernameSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
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
              Hangman Lobby
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="Enter your word (3-20 letters)"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  maxLength={20}
                />
                <button
                  onClick={createRoom}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    connectionStatus !== "connected" ||
                    isLoading ||
                    !word.trim()
                  }
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  Create Room
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())}
                  placeholder="Enter Room ID"
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
                  Join Room
                </button>

                <button
                  onClick={rejoinCurrentGame}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={connectionStatus !== "connected" || isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  Rejoin Current Game
                </button>

                <button
                  onClick={leaveCurrentGame}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={connectionStatus !== "connected" || isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <AlertTriangle className="w-5 h-5" />
                  )}
                  Leave Current Game
                </button>
              </div>
            </div>
            {connectionStatus !== "connected" && (
              <div className="mt-4 p-3 bg-yellow-600 bg-opacity-20 border border-yellow-600 rounded-lg">
                <p className="text-yellow-200 text-sm text-center">
                  Please connect your wallet to create or join games
                </p>
              </div>
            )}
          </div>
        )}

        {/* Waiting Room View */}
        {currentView === "waiting" && (
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Waiting for Guesser
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
            </h2>
            <p className="text-gray-300 mb-4">
              Share this room ID with a friend to join the game:
            </p>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={roomId}
                readOnly
                className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 text-center text-lg font-mono"
              />
              <button
                onClick={copyRoomId}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Copy room ID"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-green-400 text-sm text-center mb-4">
                Room ID copied to clipboard!
              </p>
            )}
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-gray-700 rounded">
                <BookOpen className="w-4 h-4 text-purple-500" />
                <span className="text-white text-sm">
                  {username} (You - Word Setter)
                </span>
                <Crown className="w-4 h-4 text-yellow-400 ml-auto" />
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-700 rounded opacity-50">
                <Target className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400 text-sm">
                  Waiting for guesser...
                </span>
              </div>
            </div>
            <button
              onClick={backToLobby}
              className="mt-6 w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              ← Back to Lobby
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HangmanLobby;
