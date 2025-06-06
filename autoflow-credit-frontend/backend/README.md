# 🧠 AutoFlow Credit

Auto top-up system for maintaining minimum ETH balance using USDC via MetaMask and LI.FI SDK.

## 🚀 Overview

AutoFlow Credit is a decentralized automation tool that ensures users never run out of ETH for gas. When your ETH balance drops below a threshold (e.g. 0.01 ETH), AutoFlow automatically swaps USDC (from Ethereum) to ETH (on Polygon) and bridges it using LI.FI, triggered through MetaMask.

Designed for power users, developers, and dApps who want to ensure seamless operations without manual top-ups.

## ✨ Features

- ✅ **Auto Top-Up Monitoring** via cron scheduler
- 🔗 **Cross-chain Swap** powered by LI.FI
- 💳 **MetaMask Integration** for wallet connection
- 📊 **ETH Balance Detection** with Ethers.js
- 📦 Modular Backend with Express.js
- 🧪 Simple REST API for integration

## 🧩 Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | React + Vite           |
| Wallet       | MetaMask               |
| Backend      | Node.js + Express      |
| Scheduling   | node-cron              |
| Swap Bridge  | LI.FI SDK + API        |
| Web3         | ethers.js (v6)         |

## 📁 Folder Structure

