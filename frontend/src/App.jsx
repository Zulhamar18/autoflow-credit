import React, { useState } from "react";
import WalletLogin from "./WalletLogin";
import SwapComponent from "./SwapComponent";
import WalletBalance from "./WalletBalance";
import AutoTopupToggle from "./AutoTopupToggle";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isAutoTopupEnabled, setIsAutoTopupEnabled] = useState(false);

  const handleWalletConnected = (address) => {
    setWalletAddress(address);
  };

  const handleAutoTopupToggle = (enabled) => {
    console.log("Auto Top-up toggled:", enabled);
    setIsAutoTopupEnabled(enabled);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">AutoFlow Credit</h1>
      <WalletLogin onWalletConnected={handleWalletConnected} />
      <WalletBalance address={walletAddress} />
      <SwapComponent walletAddress={walletAddress} />
      <AutoTopupToggle
        isEnabled={isAutoTopupEnabled}
        onToggle={handleAutoTopupToggle}
      />
    </div>
  );
}

export default App;


