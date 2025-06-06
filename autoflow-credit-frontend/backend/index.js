// backend/server.js
import express from "express";
import cors from "cors";
import { JsonRpcProvider, formatEther } from "ethers";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Ethers provider (RPC bisa disesuaikan via .env)
const provider = new JsonRpcProvider(process.env.ETH_RPC_URL || "https://rpc.ankr.com/eth");

let monitoredAddress = "";
let autoTopupEnabled = false;

app.use(cors());
app.use(express.json());

// 🔹 GET /balance/:address → ambil saldo ETH
app.get("/balance/:address", async (req, res) => {
  try {
    const balance = await provider.getBalance(req.params.address);
    res.json({ balance: formatEther(balance) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 POST /autotopup → toggle auto top-up
app.post("/autotopup", (req, res) => {
  const { address, enabled } = req.body;
  monitoredAddress = address;
  autoTopupEnabled = enabled;
  res.json({ message: `Auto top-up ${enabled ? "enabled" : "disabled"} for ${address}` });
});

// 🔁 CRON JOB → Cek tiap 1 menit
cron.schedule("* * * * *", async () => {
  if (!autoTopupEnabled || !monitoredAddress) return;
  try {
    const balance = await provider.getBalance(monitoredAddress);
    const ethBalance = parseFloat(formatEther(balance));
    console.log(`[AutoCheck] Balance of ${monitoredAddress}: ${ethBalance} ETH`);

    if (ethBalance < 0.01) {
      console.log(`⚠️ Auto top-up triggered for ${monitoredAddress}`);
      // TODO: Integrasi swap LI.FI
    }
  } catch (err) {
    console.error("Cron check error:", err.message);
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
