# 💳 AutoFlow Credit

Auto top-up saldo Ethereum secara otomatis menggunakan MetaMask + LI.FI + USDC — agar dompet kamu tidak pernah kehabisan gas fee lagi.

---

## 🧠 Deskripsi Proyek

**AutoFlow Credit** adalah aplikasi **backend + frontend** yang secara otomatis melakukan **top-up saldo ETH** pengguna jika saldo mereka di bawah ambang batas tertentu. Proyek ini memanfaatkan:

- **MetaMask** untuk koneksi wallet
- **LI.FI API** untuk swap token dari **USDC di Ethereum** ke **USDC di Polygon**

Tujuannya: memastikan wallet pengguna selalu siap melakukan transaksi tanpa kehabisan gas.

---

## 🚀 Fitur Utama

- 🔄 Monitoring saldo wallet Ethereum secara **real-time**
- ⚡ Auto top-up jika saldo ETH < 0.01 ETH
- 🔧 Toggle fitur auto top-up via **REST API**
- ⏱ Cron job cek saldo tiap menit
- 💻 Frontend React: koneksi MetaMask & toggle Auto Top-Up

---

## 🧰 Teknologi yang Digunakan

| Bagian     | Teknologi                       |
|------------|----------------------------------|
| Backend    | Node.js, Express, ethers.js v6, node-cron, Axios |
| Frontend   | React, Vite, MetaMask SDK       |
| Swap Token | LI.FI SDK (Ethereum → Polygon)  |
| Wallet     | MetaMask                        |
| Deployment | Localhost / Vercel / Railway    |

---

## 📁 Struktur Proyek

```bash
autoflow-credit/
├── backend/              # Server Express + Cron
│   └── index.js
├── frontend/             # React + Vite + MetaMask
│   └── App.jsx
├── .gitignore
├── package.json
├── README.md
