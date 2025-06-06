import React, { useState } from "react";
import { LiFiWidget } from "@lifi/widget";

const SwapComponent = () => {
  // State untuk form transaksi
  const [formTx, setFormTx] = useState({
    tx_hash: '',
    user_address: '',
    from_token: '',
    to_token: '',
    amount: '',
  });

  // Handler input form
  const handleChange = (e) => {
    setFormTx({ ...formTx, [e.target.name]: e.target.value });
  };

  // Submit ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/transactions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formTx,
          amount: parseFloat(formTx.amount),
        }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error('❌ Gagal simpan transaksi:', err);
    }
  };

  return (
    <div>
      <h1>🔁 AutoFlow Credit Project</h1>
      <div style={{ height: "600px" }}>
        <LiFiWidget
          config={{
            integrator: "AutoFlow Credit DevCookOff",
          }}
          theme={{
            palette: {
              primary: { main: "#4caf50" },
              secondary: { main: "#ff9800" },
            },
          }}
        />
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <form onSubmit={handleSubmit} style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Simpan Transaksi Manual (Testing)</h3>
        <input
          name="tx_hash"
          placeholder="tx_hash"
          onChange={handleChange}
          style={{ display: 'block', margin: '0.5rem 0' }}
        />
        <input
          name="user_address"
          placeholder="user_address"
          onChange={handleChange}
          style={{ display: 'block', margin: '0.5rem 0' }}
        />
        <input
          name="from_token"
          placeholder="from_token"
          onChange={handleChange}
          style={{ display: 'block', margin: '0.5rem 0' }}
        />
        <input
          name="to_token"
          placeholder="to_token"
          onChange={handleChange}
          style={{ display: 'block', margin: '0.5rem 0' }}
        />
        <input
          name="amount"
          placeholder="amount"
          type="number"
          step="any"
          onChange={handleChange}
          style={{ display: 'block', margin: '0.5rem 0' }}
        />
        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          💾 Simpan Transaksi
        </button>
      </form>
    </div>
  );
};

export default SwapComponent;






