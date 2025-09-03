"use client";
import {
  ArrowLeft,
  Twitter,
  MessageCircle,
  ExternalLink,
  Code,
  Blocks,
  GraduationCap,
  Zap,
} from "lucide-react";
import Image from "next/image";

const AboutCreator = ({ onBack }) => {
  const projects = [
    {
      name: "Tic Tac Toe",
      description: "Classic strategy game with blockchain integration",
      status: "Live",
      icon: "🎯",
    },
    {
      name: "Connect Four",
      description: "Strategic disc-dropping game on-chain",
      status: "Live",
      icon: "🔴",
    },
    {
      name: "Dots and Boxes",
      description: "Territory claiming game with smart contracts",
      status: "Live",
      icon: "📦",
    },
    {
      name: "Hangman",
      description: "Word guessing game with decentralized logic",
      status: "Live",
      icon: "🎲",
    },
    {
      name: "SOS Game",
      description: "Word guessing game with decentralized logic",
      status: "Live",
      icon: "🥏",
    },
    {
      name: "Gomoku (Five in a Row)",
      description: "Word guessing game with decentralized logic",
      status: "Live",
      icon: "🤾",
    },
    {
      name: "Battleship",
      description: "Word guessing game with decentralized logic",
      status: "Live",
      icon: "🥋",
    },
  ];

  const skills = [
    "Smart Contract Development",
    "React & Next.js",
    "Solidity",
    "Web3 Integration",
    "Game Theory",
    "DeFi Protocols",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
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
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 rounded-xl hover:border-purple-500/50 hover:text-white transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50"></div>
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-600 to-pink-600">
                <Image
                  src="/sherif.jpg"
                  alt="Sherif Lawal - Profile Picture"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mb-4">
              Sherif Lawal
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              Blockchain & Frontend Developer
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="https://twitter.com/thesheriflawal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                <Twitter className="w-5 h-5" />
                @thesheriflawal
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://t.me/thesheriflawal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl hover:from-cyan-500 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Telegram
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* About Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-2xl">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">About Me</h2>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Hi, I'm Sherif Lawal, a passionate blockchain and frontend
                developer who loves building interactive, on-chain games. My
                projects bring classic paper games like Tic Tac Toe, Connect
                Four, Dots and Boxes, and more into the blockchain space.
              </p>

              <p className="text-gray-300 leading-relaxed">
                I explore how simple game mechanics can be reimagined with smart
                contracts and decentralized logic, creating new possibilities
                for fair, transparent, and rewarding gameplay.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-2xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Education</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg flex-shrink-0">
                    <Blocks className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Web3Bridge Student
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Deepening my skills in smart contracts, decentralized
                      applications, and blockchain development
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  This is part of my ongoing journey to push the boundaries of
                  what's possible in decentralized gaming and Web3 development.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Technical{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Skills
              </span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 text-center hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="text-purple-400 font-semibold group-hover:text-purple-300 transition-colors duration-300">
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Projects
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{project.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                          {project.name}
                        </h3>
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Section */}
          <div className="text-center bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-3xl p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vision for the Future
            </h2>

            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
              I believe in the power of blockchain technology to revolutionize
              gaming by creating truly fair, transparent, and player-owned
              experiences. Through GameHub, I'm building a platform where
              classic games meet cutting-edge technology, paving the way for the
              next generation of decentralized entertainment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCreator;
