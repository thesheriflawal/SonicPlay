# 🎮 Sonic Blockchain Paper Games

A collection of fully decentralized, multiplayer classic paper games built on the **Sonic Network** using Solidity smart contracts and a React frontend. This project was developed for the **S Tier Hackathon** to showcase the power of Sonic's high-speed, builder-aligned blockchain infrastructure.

This project reimagines traditional pen-and-paper games as on-chain experiences, leveraging Sonic's lightning-fast transaction speeds and low fees to create seamless, real-time multiplayer gaming experiences.

## 🚀 Why Sonic Network?

We chose Sonic Network for this project because:

- **Fastest blockchain**: Lightning-fast transaction speeds for real-time gaming
- **Builder-aligned**: Developer-friendly infrastructure and tooling
- **Low fees**: Minimal transaction costs enable frequent game moves
- **Scalability**: Robust infrastructure supporting multiple concurrent games
- **FeeM integration**: Advanced fee management for optimal user experience

## 📜 Deployed Games on Sonic Network

| Game                   | Contract Address                             | Status  |
| ---------------------- | -------------------------------------------- | ------- |
| Tic Tac Toe            | `0x1Cd9647a5Fa82eafeEB790a9A4D7c13E796d0373` | ✅ Live |
| Connect Four           | `0x4965AB1b196E74F46267FAFC4BDb901169d9f216` | ✅ Live |
| Dots and Boxes         | `0xecdD1dC482eA3cB6c43223f7bc2f3d933afaf31b` | ✅ Live |
| Battleship             | `0x945b4ea50f30AA4d5d7F8583732f2c8D890C063c` | ✅ Live |
| Hangman                | `0x5eCE8Ab81F428A52189c34d1e9d7050392CDeb43` | ✅ Live |
| SOS Game               | `0x04B3D7a8D50303234730df87B9Cf7dAc4637E231` | ✅ Live |
| Gomoku (Five in a Row) | `0x1151461f2B6DE5FAB868102d7300a17ef50e9225` | ✅ Live |

> **Note**: All contracts are successfully deployed and confirmed on Sonic Network. Contract verification is pending due to block explorer integration.

## ✨ Sonic-Enhanced Features

### 🔗 Smart Contract Features

- **Ultra-fast gameplay**: Leverages Sonic's speed for real-time move processing
- **Gas-optimized**: Designed for Sonic's efficient fee structure
- **Room-based gameplay** with unique IDs for seamless matchmaking
- **Enforced turn-based logic** with timeout mechanisms
- **Automatic win/draw detection** per game rules
- **On-chain move history** tracking for complete game transparency
- **Session keys integration** for gasless transactions
- **ReentrancyGuard and access control** for maximum security

### 🎨 Frontend Features

- **Sonic wallet integration** for seamless connectivity
- **Real-time game updates** via Sonic blockchain events
- **Lightning-fast UI** with instant transaction confirmations
- **Responsive design** built with Tailwind CSS
- **Game lobbies** with shareable room codes
- **Animated moves** and win highlighting
- **Error handling** with automatic retry mechanisms

## 🎯 S Tier Hackathon Integration

This project demonstrates the full potential of Sonic's ecosystem:

- **Scalable Gaming Platform**: Multiple concurrent games running smoothly
- **Real-time Blockchain Gaming**: Instant move confirmations and state updates
- **Developer Experience**: Clean, maintainable smart contract architecture
- **User Experience**: Fast, responsive gameplay with minimal friction
- **Market Viability**: Classic games with proven appeal, enhanced by blockchain benefits

## 📖 Game Rules

- **Tic Tac Toe**: Get 3 in a row on a 3×3 grid
- **Connect Four**: Connect 4 pieces in any direction on a 6×7 grid
- **Dots and Boxes**: Connect lines to complete boxes and score points
- **Battleship**: Strategic ship placement with commit-reveal mechanics
- **Hangman**: Guess the hidden word before the figure is completed
- **SOS**: Place "S" or "O" to form "SOS" chains for points
- **Gomoku**: First to get 5 in a row wins on an expanded grid

## 🛠 Tech Stack

**Frontend**: React, Next.js, Tailwind CSS, Ethers.js, Lucide React  
**Smart Contracts**: Solidity, OpenZeppelin, Hardhat  
**Network**: Sonic Network (High-speed blockchain)  
**Wallet**: MetaMask, Sonic-compatible wallets  
**Development**: Hardhat deployment pipeline optimized for Sonic

## 🚀 Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/sonic-blockchain-paper-games.git
cd sonic-blockchain-paper-games

# Install dependencies
npm install

# Configure environment for Sonic Network
cp .env.example .env.local

# Add Sonic Network configuration
# NETWORK=sonic
# RPC_URL=https://rpc.soniclabs.com
# CONTRACT_ADDRESSES=... (see deployed addresses above)

# Start dev server
npm run dev
```

## 🔧 Sonic Network Configuration

The project includes optimized configuration for Sonic Network:

```javascript
// hardhat.config.js - Sonic Network setup
sonic: {
  url: "https://rpc.soniclabs.com",
  accounts: [process.env.PRIVATE_KEY],
  gasPrice: "auto",
  gas: "auto"
}
```

## 🎮 Live Demo

Experience the games live on Sonic Network:

- Connect your wallet to Sonic Network
- Visit our hosted frontend
- Create or join game rooms instantly
- Experience lightning-fast blockchain gaming

## 🔮 Future Enhancements

### Phase 1 (Post-Hackathon)

- **Tournament Mode**: Competitive brackets with leaderboards
- **NFT Achievements**: Collectible badges for game milestones
- **Advanced Analytics**: Game statistics and player profiles

### Phase 2 (Long-term)

- **AI Opponents**: Single-player mode with varying difficulty
- **Cross-chain Bridge**: Multi-network compatibility
- **Mobile App**: Native mobile experience
- **eSports Integration**: Competitive gaming tournaments

## 👨‍💻 Creator

Built by **Sherif Lawal**, blockchain & frontend developer and **Web3Bridge student**, specifically for the **Sonic S Tier Hackathon**. This project showcases how classic gaming experiences can be revolutionized through Sonic's cutting-edge blockchain infrastructure.

### 🏆 Hackathon Goals Achieved

- ✅ **Innovation**: Brought traditional games to blockchain with enhanced UX
- ✅ **Sonic Integration**: Full utilization of Sonic's speed and efficiency
- ✅ **Market Viability**: Proven game concepts with blockchain advantages
- ✅ **Technical Excellence**: Clean, scalable smart contract architecture
- ✅ **User Experience**: Seamless, fast gameplay matching Web2 standards

📌 **Connect with me:**

- **X (Twitter)**: [@thesheriflawal](https://x.com/thesheriflawal)
- **Telegram**: [@thesheriflawal](https://t.me/thesheriflawal)

## 🏆 S Tier Hackathon Submission

This project represents our vision for the future of blockchain gaming on Sonic Network. By combining the familiarity of classic paper games with the transparency and decentralization of blockchain technology, we've created an experience that's both nostalgic and revolutionary.

**Why This Project Matters:**

- Demonstrates Sonic's capability for real-time applications
- Showcases practical blockchain adoption in gaming
- Provides a foundation for the next generation of on-chain games
- Proves that blockchain gaming can match traditional gaming speeds

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Built for Sonic. Built for the future. Built for gamers.**
