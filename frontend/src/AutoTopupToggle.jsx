import React, { useState, useEffect } from 'react';

function AutoTopupToggle({ walletAddress }) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fungsi untuk fetch status auto-top-up dari backend
  const fetchStatus = async () => {
    try {
      const res = await fetch(`http://localhost:8000/users/${walletAddress}`);
      if (!res.ok) throw new Error('Failed to fetch status');
      const data = await res.json();
      setEnabled(data.auto_topup_enabled);
    } catch (err) {
      setMessage('Error fetching status');
      console.error(err);
    }
  };

  // Fungsi toggle status auto-top-up
  const toggleStatus = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`http://localhost:8000/autotopup/toggle/${walletAddress}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setEnabled(data.enabled);
        setMessage('Auto top-up status updated');
      } else {
        setMessage(data.error || 'Failed to update status');
      }
    } catch (err) {
      setMessage('Error updating status');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (walletAddress) fetchStatus();
  }, [walletAddress]);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Auto Top-Up</h3>
      <p>Status: <strong>{enabled ? 'Enabled' : 'Disabled'}</strong></p>
      <button onClick={toggleStatus} disabled={loading}>
        {loading ? 'Updating...' : enabled ? 'Disable' : 'Enable'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AutoTopupToggle;
