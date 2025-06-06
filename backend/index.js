// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ethers = require("ethers");
const cron = require("node-cron");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const THRESHOLD_ETH = ethers.utils.parseEther("0.01"); // batas minimum saldo
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Route untuk test
app.get("/", (req, res) => {
  res.send("AutoFlow backend is running");
});

// Cek saldo wallet (endpoint opsional)
app.get("/balance", async (req, res) => {
  try {
    const balance = await provider.getBalance(WALLET_ADDRESS);
    res.json({ balance: ethers.utils.formatEther(balance) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cron job: cek tiap menit
cron.schedule("* * * * *", async () => {
  try {
    const balance = await provider.getBalance(WALLET_ADDRESS);
    console.log("Checking wallet balance...");

    if (balance.lt(THRESHOLD_ETH)) {
      console.log("Balance is low! Triggering auto top-up...");
      // Di sinilah kita akan lakukan integrasi swap via LI.FI API
      // Untuk sementara kita log saja
      // TODO: trigger swap USDC Ethereum -> USDC Polygon
    } else {
      console.log("Balance is sufficient.");
    }
  } catch (err) {
    console.error("Auto top-up check failed:", err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
