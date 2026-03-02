import React, { useState, useEffect } from 'react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@500&display=swap');

  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .root {
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 16px;
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .container { 
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .header { 
    text-align: center; 
    margin-bottom: 24px; 
  }

  .header h1 { 
    font-size: 26px;
    font-weight: 800; 
    color: #fff;
    text-shadow: 0 2px 8px rgba(0,0,0,0.15);
    margin-bottom: 6px;
    letter-spacing: -0.5px;
  }

  .header p { 
    color: rgba(255,255,255,0.85);
    font-size: 14px;
    font-weight: 500;
  }

  .card {
    background: #fff;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.10);
    margin-bottom: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.13);
  }

  .card-dark {
    background: linear-gradient(135deg, #1e293b, #334155);
    color: #fff;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.18);
    margin-bottom: 16px;
    width: 100%;
  }

  .lbl { 
    display: block; 
    font-weight: 700;
    margin-bottom: 10px; 
    color: #06080a;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .input-wrap { 
    position: relative; 
    width: 100%; 
  }

  .prefix {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    font-weight: 700;
    font-size: 14px;
    pointer-events: none;
    z-index: 1;
    font-family: 'DM Mono', monospace;
  }

  .input {
    width: 100%;
    padding: 13px 16px 13px 52px;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    font-size: 15px;
    outline: none;
    color: #1e293b;
    transition: all 0.2s;
    -webkit-appearance: none;
    font-family: 'DM Mono', monospace;
    font-weight: 600;
  }

  .input:focus {
    border-color: #667eea;
  }

  .input.err {
    border-color: #ef4444;
    background: #fef2f2;
    animation: shake 0.3s;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25%       { transform: translateX(-5px); }
    75%       { transform: translateX(5px); }
  }

  .date-input {
    width: 100%;
    padding: 13px 16px;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    font-size: 15px;
    outline: none;
    background: #f8fafc;
    color: #1e293b;
    -webkit-appearance: none;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    font-weight: 600;
  }

  .date-input:focus {
    border-color: #667eea;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(102,126,234,0.12);
  }

  .preset-40 {
    margin-top: 12px;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    border: 2px solid #e2e8f0;
    background: #f8fafc;
    color: #64748b;
  }

  .preset-40.on {
    border-color: #667eea;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    box-shadow: 0 4px 12px rgba(102,126,234,0.3);
  }

  .dep-bar {
    margin-top: 12px;
    padding: 12px 16px;
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    border-left: 4px solid #3b82f6;
  }

  .weeks-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 12px;
  }

  .week-btn {
    padding: 13px 0;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    border: 2px solid #e2e8f0;
    background: #f8fafc;
    color: #374151;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .week-btn:active { transform: scale(0.95); }

  .week-btn.on {
    border-color: #667eea;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    box-shadow: 0 4px 12px rgba(102,126,234,0.3);
  }

  .brow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    gap: 12px;
  }

  .brow:last-child { border-bottom: none; padding-bottom: 0; }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    backdrop-filter: blur(6px);
    animation: fadeIn 0.2s ease-in;
  }

  .modal {
    background: #fff;
    border-radius: 20px;
    padding: 28px;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.3);
    max-height: 88vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .mrow {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    gap: 12px;
  }

  .mrow:last-of-type { border-bottom: none; }

  .modal-actions {
    display: flex;
    gap: 10px;
    margin-top: 24px;
  }

  .btn-close {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    background: #f8fafc;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .btn-close:hover { background: #e2e8f0; }

  .btn-confirm {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(102,126,234,0.3);
  }

  .btn-confirm:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102,126,234,0.4);
  }

  .txt-warn {
    color: #ef4444;
    font-size: 12px;
    margin-top: 8px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .txt-info {
    color: #64748b;
    font-size: 13px;
    margin-top: 10px;
    font-weight: 500;
  }

  .txt-green {
    color: #16a34a;
    font-size: 13px;
    font-weight: 600;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .submit-btn {
    width: 100%;
    padding: 16px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    margin-bottom: 24px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    box-shadow: 0 4px 16px rgba(102,126,234,0.35);
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102,126,234,0.45);
  }

  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  @media (max-width: 360px) {
    html { font-size: 14px; }
    .root { padding: 16px 10px; }
    .container { max-width: 100%; }
    .header h1 { font-size: 20px; }
    .header p  { font-size: 12px; }
    .card, .card-dark { padding: 14px; border-radius: 12px; margin-bottom: 12px; }
    .lbl { font-size: 11px; }
    .input { padding: 10px 14px 10px 44px; font-size: 14px; }
    .prefix { left: 12px; font-size: 13px; }
    .weeks-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .week-btn { padding: 11px 0; font-size: 13px; }
    .submit-btn { padding: 14px; font-size: 14px; }
    .modal { padding: 18px; }
    .modal-actions { flex-direction: column; }
    .btn-close, .btn-confirm { width: 100%; padding: 12px; }
  }

  @media (min-width: 361px) and (max-width: 480px) {
    html { font-size: 15px; }
    .root { padding: 20px 12px; }
    .container { max-width: 100%; }
    .header h1 { font-size: 22px; }
    .card, .card-dark { padding: 16px; margin-bottom: 14px; }
    .weeks-grid { grid-template-columns: repeat(2, 1fr); }
    .modal { max-width: 100%; padding: 20px; }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .root { padding: 32px 20px; }
    .container { max-width: 500px; }
    .header h1 { font-size: 28px; }
    .card, .card-dark { padding: 22px; margin-bottom: 18px; }
    .modal { max-width: 460px; padding: 28px; }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .root { padding: 48px 32px; }
    .container { max-width: 560px; }
    .header h1 { font-size: 32px; }
    .card, .card-dark { padding: 26px; margin-bottom: 20px; }
    .week-btn { padding: 14px 0; font-size: 15px; }
    .submit-btn { padding: 18px; font-size: 17px; }
    .modal { max-width: 520px; padding: 32px; }
  }

  @media (min-width: 1025px) and (max-width: 1440px) {
    .root { padding: 60px 40px; }
    .container { max-width: 620px; }
    .header h1 { font-size: 36px; }
    .card, .card-dark { padding: 28px; margin-bottom: 22px; }
    .lbl { font-size: 13px; }
    .input, .date-input { font-size: 16px; padding: 14px 18px 14px 54px; }
    .prefix { left: 16px; font-size: 15px; }
    .week-btn { padding: 14px 0; font-size: 15px; }
    .submit-btn { padding: 18px; font-size: 17px; }
    .modal { max-width: 540px; padding: 36px; }
    .mrow { font-size: 15px; padding: 12px 0; }
  }

  @media (min-width: 1441px) {
    html { font-size: 17px; }
    .root { padding: 80px 48px; }
    .container { max-width: 680px; }
    .header h1 { font-size: 40px; }
    .card, .card-dark { padding: 32px; border-radius: 20px; margin-bottom: 26px; }
    .lbl { font-size: 14px; }
    .input, .date-input { font-size: 17px; padding: 16px 20px 16px 58px; }
    .prefix { left: 18px; font-size: 16px; }
    .week-btn { padding: 16px 0; font-size: 16px; }
    .submit-btn { padding: 20px; font-size: 18px; }
    .modal { max-width: 600px; padding: 40px; }
    .mrow { font-size: 16px; padding: 14px 0; }
  }

  @media (max-width: 896px) and (orientation: landscape) {
    .root { padding: 16px 12px; }
    .header { margin-bottom: 14px; }
    .header h1 { font-size: 20px; }
    .card, .card-dark { padding: 14px; margin-bottom: 12px; }
    .modal { max-height: 95vh; }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  @media (prefers-color-scheme: dark) {
    .root { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); }
    .card {
      background: #f1f5f9;
      border: 1px solid #334155;
      border-left: 4px solid #3b82f6;
      border-top: 4px solid #3b82f6;
    }
    .lbl { color: #0f172a; }
    .input, .date-input {
      background: #0f172a;
      color: #f1f5f9;
      border-color: #334155;
    }
    .input::placeholder { color: #64748b; }
  }

  @media print {
    .root { background: #fff; padding: 0; justify-content: flex-start; }
    .submit-btn, .preset-40, .week-btn { display: none; }
    .card, .card-dark { box-shadow: none; border: 1px solid #ddd; page-break-inside: avoid; }
  }
`;

const MULTIPLIERS = { 4: 1.3, 8: 1.4, 12: 1.5, 16: 1.6, 20: 1.7, 24: 1.8 };
const fmt  = d => d ? new Date(d).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'short', day:'numeric' }) : '';
const fmtS = d => d ? new Date(d).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) : '';

export default function ResponsiveCalculator() {
  const [cashPrice,     setCashPrice]     = useState(0);
  const [depositInput,  setDepositInput]  = useState('');
  const [using40,       setUsing40]       = useState(false);
  const [selectedWeeks, setSelectedWeeks] = useState(4);
  const [startDate,     setStartDate]     = useState('');
  const [showSummary,   setShowSummary]   = useState(false);

  const minDeposit = cashPrice * 0.40;
  const rawVal     = parseFloat(depositInput) || 0;
  const isBelowMin = cashPrice > 0 && rawVal > 0 && rawVal < minDeposit;
  const isAboveMax = cashPrice > 0 && rawVal > cashPrice;
  const depositKsh = isAboveMax ? cashPrice : rawVal;
  const depositPct = cashPrice > 0 ? (depositKsh / cashPrice) * 100 : 0;

  const remaining  = cashPrice - depositKsh;

  const multiplier = MULTIPLIERS[selectedWeeks];
  const weekly     = remaining > 0 ? (remaining / selectedWeeks) * multiplier : 0;
  const total      = depositKsh + weekly * selectedWeeks;
  const interest   = total - cashPrice;

  const endDate = (() => {
    if (!startDate) return '';
    const d = new Date(startDate);
    d.setDate(d.getDate() + selectedWeeks * 7);
    return d.toISOString().split('T')[0];
  })();

  useEffect(() => {
    if (using40) setDepositInput((cashPrice * 0.40).toFixed(2));
  }, [cashPrice]);

  const apply40 = () => {
    setUsing40(true);
    setDepositInput((cashPrice * 0.40).toFixed(2));
  };

  const handleDepositChange = (e) => {
    setUsing40(false);
    setDepositInput(e.target.value);
  };

  const canConfirm = cashPrice > 0 && !isBelowMin && !isAboveMax && depositKsh > 0;

  const SummaryDialog = () => (
    <div className="overlay" onClick={() => setShowSummary(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px' }}>
          Payment Summary
        </h2>
        {[
          ['Cash Price',             `Ksh ${cashPrice.toFixed(2)}`],
          startDate ? ['Start Date', fmtS(startDate)] : null,
          startDate ? ['End Date',   fmtS(endDate)]   : null,
          ['Deposit',                `Ksh ${depositKsh.toFixed(2)} (${depositPct.toFixed(1)}%)`],
          ['Number of Weeks',        `${selectedWeeks} weeks`],
          ['Multiplier',             `${multiplier}x`],
          ['Weekly Installment',     `Ksh ${weekly.toFixed(2)}`],
          ['Total Weekly Payments',  `Ksh ${(weekly * selectedWeeks).toFixed(2)}`],
          ['Interest Amount',        `Ksh ${interest.toFixed(2)}`],
        ].filter(Boolean).map(([label, value]) => (
          <div key={label} className="mrow">
            <span style={{ color: '#64748b', fontSize: 14, fontWeight: 600 }}>{label}</span>
            <span style={{ fontWeight: 700, fontSize: 14, textAlign: 'right', color: '#1e293b', fontFamily: "'DM Mono', monospace" }}>{value}</span>
          </div>
        ))}
        <div className="modal-actions">
          <button className="btn-close" onClick={() => setShowSummary(false)}>Close</button>
          <button className="btn-confirm" onClick={() => { setShowSummary(false); alert('Payment plan confirmed!'); }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{css}</style>
      <div className="root">
        {showSummary && <SummaryDialog />}

        <div className="container">
          <div className="header">
            <h1>💳 Installment Calculator</h1>
            <p>Plan your payments with ease</p>
          </div>

          {/* Cash Price */}
          <div className="card">
            <label className="lbl">Cash Price</label>
            <div className="input-wrap">
              <span className="prefix">Ksh</span>
              <input
                className="input"
                type="number" min="0"
                placeholder="0.00"
                onChange={e => setCashPrice(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Deposit */}
          <div className="card">
            <label className="lbl">Deposit Amount</label>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 10, fontWeight: 500 }}>
              Minimum deposit is <strong>40%</strong> of cash price
              {cashPrice > 0 && ` — Ksh ${minDeposit.toFixed(2)}`}
            </p>

            <div className="input-wrap" style={{ marginBottom: 4 }}>
              <span className="prefix">Ksh</span>
              <input
                className={`input${isBelowMin || isAboveMax ? ' err' : ''}`}
                type="number" min="0"
                placeholder={cashPrice > 0 ? `Min Ksh ${minDeposit.toFixed(2)}` : '0.00'}
                value={depositInput}
                onChange={handleDepositChange}
              />
            </div>

            {isBelowMin && (
              <p className="txt-warn">
                <span>⚠️</span> Deposit must be at least 40% (Ksh {minDeposit.toFixed(2)})
              </p>
            )}
            {isAboveMax && cashPrice > 0 && (
              <p className="txt-warn">
                <span>⚠️</span> Deposit cannot exceed cash price (Ksh {cashPrice.toFixed(2)})
              </p>
            )}

            <button
              className={`preset-40${using40 ? ' on' : ''}`}
              onClick={apply40}
              disabled={cashPrice <= 0}
              style={{ opacity: cashPrice <= 0 ? 0.45 : 1 }}
            >
              40%{cashPrice > 0 && ` = Ksh ${minDeposit.toFixed(0)}`}
            </button>

            {cashPrice > 0 && depositKsh > 0 && !isBelowMin && !isAboveMax && (
              <div className="dep-bar">
                <span style={{ color: '#3b82f6', fontSize: 13, fontWeight: 600 }}>
                  Deposit — {depositPct.toFixed(1)}% of cash price
                </span>
                <span style={{ color: '#1d4ed8', fontWeight: 800, fontSize: 15, fontFamily: "'DM Mono', monospace" }}>
                  Ksh {depositKsh.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Start Date */}
          <div className="card">
            <label className="lbl">Payment Start Date</label>
            <input
              className="date-input"
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
            {startDate && <p className="txt-info">📅 {fmt(startDate)}</p>}
            {startDate && endDate && (
              <p className="txt-green">
                <span>✓</span> Payment ends on {fmt(endDate)}
              </p>
            )}
          </div>

          {/* Weeks */}
          <div className="card">
            <label className="lbl">Number of Weeks</label>
            <div className="weeks-grid">
              {[4, 8, 12, 16, 20, 24].map(w => (
                <button
                  key={w}
                  className={`week-btn${selectedWeeks === w ? ' on' : ''}`}
                  onClick={() => setSelectedWeeks(w)}
                >
                  {w} wks
                </button>
              ))}
            </div>
            <p style={{ color: '#64748b', fontSize: 13, fontWeight: 600, marginTop: 8 }}>
              Multiplier: <strong style={{ color: '#667eea' }}>{multiplier}x</strong>
            </p>
          </div>

          {/* Breakdown */}
          <div className="card-dark">
            <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 800 }}>Payment Breakdown</h3>
            {[
              ['Cash Price',         `Ksh ${cashPrice.toFixed(2)}`],
              ['Deposit',            `Ksh ${depositKsh.toFixed(2)} (${depositPct.toFixed(1)}%)`],
              ['Weekly Installment', `Ksh ${weekly.toFixed(2)}`],
              ['Number of Weeks',    `${selectedWeeks} weeks`],
            ].map(([label, value]) => (
              <div key={label} className="brow">
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 500 }}>{label}</span>
                <span style={{ fontWeight: 700, fontSize: 14, textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Deposit only — NO weekly schedule */}
          {cashPrice > 0 && !isBelowMin && !isAboveMax && depositKsh > 0 && (
            <div className="card">
              <div style={{ display:'flex', alignItems:'center', padding:'12px 14px', background:'linear-gradient(135deg,#eff6ff,#dbeafe)', borderRadius:12, marginBottom: 0, borderLeft:'4px solid #3b82f6' }}>
                <span style={{ fontSize:20, marginRight:12 }}>💳</span>
                <span style={{ flex:1, fontSize:14, color:'#374151', fontWeight:600 }}>
                  {startDate ? `Initial Deposit — ${fmtS(startDate)}` : 'Initial Deposit'}
                </span>
                <span style={{ fontWeight:800, color:'#1d4ed8', fontFamily:"'DM Mono', monospace" }}>
                  Ksh {depositKsh.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* View Summary Button */}
          {canConfirm && (
            <button className="submit-btn" onClick={() => setShowSummary(true)}>
              View Payment Summary
            </button>
          )}
        </div>
      </div>
    </>
  );
}
