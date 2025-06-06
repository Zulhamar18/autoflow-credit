# AutoFlow Credit

## Deskripsi Proyek
AutoFlow Credit adalah aplikasi backend + frontend yang berfungsi untuk melakukan auto top-up saldo Ethereum secara otomatis ketika saldo wallet pengguna di bawah threshold tertentu.  
Fitur utama menggunakan integrasi MetaMask untuk wallet connection dan LI.FI API untuk swap token USDC dari Ethereum ke Polygon.

## Fitur Utama
- Monitoring saldo wallet Ethereum secara real-time.
- Auto top-up otomatis ketika saldo ETH di bawah 0.01 ETH.
- Toggle fitur auto top-up via REST API.
- Cron job pengecekan saldo setiap menit.
- Frontend React untuk koneksi MetaMask dan toggle fitur.

## Teknologi yang Digunakan
- Backend: Node.js, Express, ethers.js v6, node-cron, Axios.
- Frontend: React, Vite, MetaMask SDK.
- Deployment: localhost (dev) atau platform hosting pilihan.

## Struktur Proyek
