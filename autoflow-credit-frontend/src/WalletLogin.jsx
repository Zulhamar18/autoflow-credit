import React from 'react';
import { ethers } from 'ethers';

function WalletLogin({ setWalletAddress }) {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('User denied wallet connection');
      }
    } else {
      alert('MetaMask is not installed');
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect MetaMask Wallet</button>
    </div>
  );
}

export default WalletLogin;

