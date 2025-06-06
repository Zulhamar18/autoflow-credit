import React, { useState } from "react";
import axios from "axios";

function AutoTopupToggle({ isEnabled, onToggle }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/auto-topup/toggle", {
        enabled: !isEnabled,
      });

      if (response.data.success) {
        onToggle(!isEnabled);
      } else {
        alert("Failed to toggle Auto Top-up");
      }
    } catch (error) {
      alert("Error toggling Auto Top-up: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Auto Top-up</h2>
      <p>Status: {isEnabled ? "Enabled" : "Disabled"}</p>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`mt-2 px-4 py-2 rounded ${
          isEnabled ? "bg-red-500" : "bg-green-500"
        } text-white`}
      >
        {loading ? "Processing..." : isEnabled ? "Disable Auto Top-up" : "Enable Auto Top-up"}
      </button>
    </div>
  );
}

export default AutoTopupToggle;
