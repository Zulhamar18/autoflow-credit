import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { LiFi } from '@lifi/sdk';

const lifi = new LiFi();

const SwapComponent = ({ walletAddress }) => {
  const [quote, setQuote] = useState(null);
  const [isSwapping, setIsSwapping] = useState(false);

  const fromChain = 1; // Ethereum
  const toChain = 137; // Polygon
  const fromToken = {
    chainId: 1,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC on Ethereum
  };
  const toToken = {
    chainId: 137,
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC on Polygon
  };

  const amount = ethers.utils.parseUnits("1.0", 6); // 1 USDC (6 decimals)

  const getQuote = async () => {
    try {
      const result = await lifi.getQuote({
        fromChain,
        toChain,
        fromToken,
        toToken,
        fromAddress: walletAddress,
        toAddress: walletAddress,
        fromAmount: amount.toString(),
      });
      setQuote(result);
      console.log('Quote:', result);
    } catch (error) {
      console.error('Quote error:', error);
    }
  };

  const performSwap = async () => {
    if (!quote || !walletAddress) return;
    try {
      setIsSwapping(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: quote.transaction.to,
        data: quote.transaction.data,
        value: ethers.BigNumber.from(quote.transaction.value || '0'),
        gasLimit: ethers.BigNumber.from(quote.transaction.gasLimit || '210000'),
      });

      console.log('Swap Transaction Hash:', tx.hash);
      alert('Swap initiated! Check console for details.');
    } catch (err) {
      console.error('Swap error:', err);
    } finally {
      setIsSwapping(false);
    }
  };

  useEffect(() => {
    if (walletAddress) getQuote();
  }, [walletAddress]);

  return (
    <div>
      <h2>Swap Component</h2>
      <p>Wallet address: {walletAddress}</p>
      {quote ? (
        <>
          <p>From: {quote.estimate.fromAmount / 1e6} USDC</p>
          <p>To: ~{quote.estimate.toAmount / 1e6} USDC on Polygon</p>
          <button onClick={performSwap} disabled={isSwapping}>
            {isSwapping ? 'Swapping...' : 'Swap Now'}
          </button>
        </>
      ) : (
        <p>Loading quote...</p>
      )}
    </div>
  );
};

export default SwapComponent;

