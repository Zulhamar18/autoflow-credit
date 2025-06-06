import React, { useState, useEffect } from 'react';

const WalletConnect = ({ onAddressChange }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        onAddressChange(accounts[0]);
      } catch (error) {
        console.error('User rejected connection', error);
      }
    } else {
      alert('MetaMask not installed!');
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
      onAddressChange(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginBottom: 20 }}>
      {account ? (
        <p>🔗 Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
      ) : (
        <button onClick={connectWallet} style={{ padding: 10, borderRadius: 8 }}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
