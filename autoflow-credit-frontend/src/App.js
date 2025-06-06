import React, { useEffect, useState } from "react";
import axios from "axios";

const AutoTopupToggle = ({ walletAddress, isEnabled, onToggle }) => {
  const [enabled, setEnabled] = useState(isEnabled);

  useEffect(() => {
    setEnabled(isEnabled);
  }, [isEnabled]);

  const handleToggle = async () => {
    try {
      const newState = !enabled;
      setEnabled(newState);
      onToggle(newState);

      await axios.post("http://localhost:5001/autotopup", {
        address: walletAddress,
        enabled: newState,
      });
    } catch (error) {
      console.error("Failed to toggle auto-topup:", error);
    }
  };

  return (
    <div>
      <h2>Auto Top-up</h2>
      <p>Status: {enabled ? "Enabled" : "Disabled"}</p>
      <button onClick={handleToggle}>
        {enabled ? "Disable Auto Top-up" : "Enable Auto Top-up"}
      </button>
    </div>
  );
};

export default AutoTopupToggle;
