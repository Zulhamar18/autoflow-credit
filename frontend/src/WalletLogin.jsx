import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

const WalletLogin = ({ onLogin }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [usdcBalance, setUsdcBalance] = useState(null);

  const handleLogin = async () => {
    try {
      // 1. Connect wallet
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      // 2. Buat SIWE Message
      const domain = window.location.host;
      const origin = window.location.origin;
      const message = new SiweMessage({
        domain,
        address,
        statement: "Sign in with Ethereum to AutoFlow Credit.",
        uri: origin,
        version: "1",
        chainId: 1,
        nonce: "123456", // Gantilah dengan nonce acak jika perlu
      });

      const signedMessage = await signer.signMessage(message.prepareMessage());

      // 3. Kirim data login ke backend (opsional, jika backend autentikasi)
      // await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message, signature: signedMessage }),
      // });

      onLogin(address);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // 🔁 Cek saldo USDC setelah login
  useEffect(() => {
    const fetchUSDCBalance = async () => {
      if (!walletAddress) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const usdcContract = new ethers.Contract(
        "0xA0b86991C6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC contract on Ethereum mainnet
        [
          "function balanceOf(address owner) view returns (uint256)",
          "function decimals() view returns (uint8)",
        ],
        provider
      );

      const balance = await usdcContract.balanceOf(walletAddress);
      const decimals = await usdcContract.decimals();
      const formatted = ethers.utils.formatUnits(balance, decimals);
      setUsdcBalance(formatted);
    };

    fetchUSDCBalance();
  }, [walletAddress]);

  return (
    <div className="p-4 rounded-xl shadow-md bg-white mb-4">
      {!walletAddress ? (
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          🔑 Login dengan MetaMask
        </button>
      ) : (
        <div>
          <p>👛 Wallet: {walletAddress}</p>
          <p>💰 USDC Balance: {usdcBalance ?? "Loading..."}</p>
        </div>
      )}
    </div>
  );
};

export default WalletLogin;
