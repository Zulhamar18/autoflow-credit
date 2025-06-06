import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function WalletBalance({ walletAddress }) {
  const [balance, setBalance] = useState('0.0');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!walletAddress) {
      setBalance('0.0');
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    async function fetchBalance() {
      try {
        const balanceBigInt = await provider.getBalance(walletAddress);
        const balanceInEther = ethers.formatEther(balanceBigInt);
        setBalance(parseFloat(balanceInEther).toFixed(4));
        setError(null);
      } catch (err) {
        setError('Gagal mengambil saldo');
        setBalance('0.0');
      }
    }

    fetchBalance();

    // Refresh saldo tiap 10 detik
    const interval = setInterval(fetchBalance, 10000);

    return () => clearInterval(interval);
  }, [walletAddress]);

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      Wallet Balance: {balance} ETH
    </div>
  );
}

export default WalletBalance;
