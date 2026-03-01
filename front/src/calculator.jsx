import React, { useState, useEffect } from 'react';

const css = `
  /* ══════════════════════════════════════════════════════════════
     BASE STYLES - Mobile First Approach
     ══════════════════════════════════════════════════════════════ */
  
  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .root {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    padding: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  }

  .container { 
    width: 100%; 
    max-width: 100%;
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ══════════════════════════════════════════════════════════════
     HEADER STYLES
     ══════════════════════════════════════════════════════════════ */
  
  .header { 
    text-align: center; 
    margin-bottom: 20px; 
  }
  
  .header h1 { 
    font-size: 22px;
    font-weight: 800; 
    color: #fff;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 6px;
  }
  
  .header p { 
    color: rgba(255, 255, 255, 0.9);
    font-size: 13px;
    font-weight: 500;
  }

  /* ══════════════════════════════════════════════════════════════
     CARD STYLES
     ══════════════════════════════════════════════════════════════ */
  
  .card {
    background: #fff;
    border-radius: 12px;
    padding: 18px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    margin-bottom: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }

  .card-dark {
    background: linear-gradient(135deg, #1e293b, #334155);
    color: #fff;
    border-radius: 12px;
    padding: 18px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    margin-bottom: 16px;
  }

  /* ══════════════════════════════════════════════════════════════
     FORM ELEMENTS
     ══════════════════════════════════════════════════════════════ */
  
  .lbl { 
    display: block; 
    font-weight: 700;
    margin-bottom: 8px; 
    color: #1e293b;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
  }

  .input {
    width: 100%;
    padding: 12px 16px 12px 50px;
    border-radius: 10px;
    border: 2px solid #e2e8f0;
    font-size: 15px;
    outline: none;
    background: #f8fafc;
    color: #1e293b;
    transition: all 0.2s;
    -webkit-appearance: none;
    font-family: inherit;
    font-weight: 600;
  }

  .input:focus {
    border-color: #667eea;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .input.err {
    border-color: #ef4444;
    background: #fef2f2;
    animation: shake 0.3s;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  .date-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 10px;
    border: 2px solid #e2e8f0;
    font-size: 15px;
    outline: none;
    background: #f8fafc;
    color: #1e293b;
    -webkit-appearance: none;
    font-family: inherit;
    transition: all 0.2s;
    font-weight: 600;
  }

  .date-input:focus {
    border-color: #667eea;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  /* ══════════════════════════════════════════════════════════════
     BUTTONS
     ══════════════════════════════════════════════════════════════ */
  
  .preset-40 {
    margin-top: 10px;
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;
    border: 2px solid #e2e8f0;
    background: #f8fafc;
    color: #64748b;
  }

  .preset-40:active {
    transform: scale(0.98);
  }

  .preset-40.on {
    border-color: #667eea;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  /* ══════════════════════════════════════════════════════════════
     DEPOSIT INFO BAR
     ══════════════════════════════════════════════════════════════ */
  
  .dep-bar {
    margin-top: 12px;
    padding: 12px 16px;
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    border-left: 4px solid #3b82f6;
  }

  .dep-bar.warn-bar {
    background: linear-gradient(135deg, #fff7ed, #fed7aa);
    border-left-color: #f59e0b;
  }

  /* ══════════════════════════════════════════════════════════════
     WEEKS GRID
     ══════════════════════════════════════════════════════════════ */
  
  .weeks-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 12px;
  }

  .week-btn {
    padding: 12px 0;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    border: 2px solid #e2e8f0;
    background: #f8fafc;
    color: #374151;
    transition: all 0.2s;
    font-family: inherit;
  }

  .week-btn:active {
    transform: scale(0.95);
  }

  .week-btn.on {
    border-color: #667eea;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  /* ══════════════════════════════════════════════════════════════
     BREAKDOWN ROWS
     ══════════════════════════════════════════════════════════════ */
  
  .brow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    gap: 12px;
  }

  .brow:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  /* ══════════════════════════════════════════════════════════════
     SCHEDULE ROWS
     ══════════════════════════════════════════════════════════════ */
  
  .srow {
    display: flex;
    align-items: center;
    padding: 12px 14px;
    border-radius: 10px;
    margin-bottom: 8px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    transition: all 0.2s;
  }

  .srow:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }

  .badge {
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 800;
    margin-right: 12px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  /* ══════════════════════════════════════════════════════════════
     SUBMIT BUTTON
     ══════════════════════════════════════════════════════════════ */
  
  .submit-btn {
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    margin-bottom: 20px;
    font-family: inherit;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  .submit-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ══════════════════════════════════════════════════════════════
     MODAL
     ══════════════════════════════════════════════════════════════ */
  
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease-in;
  }

  .modal {
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    width: 100%;
    max-width: 95%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-height: 85vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .mrow {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    gap: 12px;
  }

  .mrow:last-of-type {
    border-bottom: none;
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    margin-top: 24px;
  }

  .btn-close {
    flex: 1;
    padding: 14px;
    border-radius: 10px;
    border: 2px solid #e2e8f0;
    background: #f8fafc;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    font-family: inherit;
    transition: all 0.2s;
  }

  .btn-close:hover {
    background: #e2e8f0;
  }

  .btn-confirm {
    flex: 1;
    padding: 14px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    font-family: inherit;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .btn-confirm:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  /* ══════════════════════════════════════════════════════════════
     TEXT UTILITIES
     ══════════════════════════════════════════════════════════════ */
  
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

  /* ══════════════════════════════════════════════════════════════
     MEDIA QUERIES - COMPREHENSIVE RESPONSIVE DESIGN
     ══════════════════════════════════════════════════════════════ */

  /* ────────────────────────────────────────────────────────────── */
  /* Extra Small Devices (Portrait Phones, 0-360px) */
  /* ────────────────────────────────────────────────────────────── */
  @media (max-width: 360px) {
    html { font-size: 14px; }
    
    .root { 
      padding: 12px 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .container { max-width: 100%; }
    
    .header { margin-bottom: 16px; }
    .header h1 { font-size: 19px; }
    .header p { font-size: 12px; }
    
    .card, .card-dark {
      padding: 14px;
      border-radius: 10px;
      margin-bottom: 12px;
    }
    
    .lbl { font-size: 12px; }
    
    .input, .date-input {
      font-size: 14px;
      padding: 10px 14px 10px 45px;
    }
    
    .prefix {
      left: 12px;
      font-size: 13px;
    }
    
    .weeks-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    
    .week-btn {
      padding: 10px 0;
      font-size: 13px;
    }
    
    .preset-40 {
      padding: 7px 14px;
      font-size: 12px;
    }
    
    .badge {
      width: 28px;
      height: 28px;
      min-width: 28px;
      font-size: 11px;
    }
    
    .srow {
      padding: 10px 12px;
      margin-bottom: 6px;
    }
    
    .submit-btn {
      padding: 14px;
      font-size: 14px;
    }
    
    .modal {
      padding: 18px;
      max-width: 100%;
    }
    
    .modal h2 { font-size: 18px !important; }
    
    .mrow {
      font-size: 12px;
      padding: 8px 0;
    }
    
    .modal-actions {
      flex-direction: column;
      gap: 8px;
    }
    
    .btn-close, .btn-confirm {
      width: 100%;
      padding: 12px;
    }
  }

  /* ────────────────────────────────────────────────────────────── */
  /* Small Devices (Landscape Phones, 361px-480px) */
  /* ────────────────────────────────────────────────────────────── */
  @media (min-width: 361px) and (max-width: 480px) {
    html { font-size: 15px; }
    
    .root { padding: 14px 10px; }
    
    .header { margin-bottom: 18px; }
    .header h1 { font-size: 21px; }
    .header p { font-size: 13px; }
    
    .card, .card-dark {
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 14px;
    }
    
    .weeks-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    
    .modal {
      padding: 20px;
      max-width: 100%;
    }
    
    .modal h2 { font-size: 19px !important; }
  }

  /* ────────────────────────────────────────────────────────────── */
  /* Medium Devices (Tablets Portrait, 481px-768px) */
  /* ────────────────────────────────────────────────────────────── */
  @media (min-width: 481px) and (max-width: 768px) {
    html { font-size: 16px; }
    
    .root { padding: 20px 16px; }
    
    .container { max-width: 560px; }
    
    .header { margin-bottom: 24px; }
    .header h1 { font-size: 26px; }
    .header p { font-size: 14px; }
    
    .card, .card-dark {
      padding: 20px;
      border-radius: 14px;
      margin-bottom: 18px;
    }
    
    .weeks-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    
    .input, .date-input {
      font-size: 16px;
    }
    
    .modal {
      max-width: 480px;
      padding: 28px;
    }
    
    .modal h2 { font-size: 22px !important; }
  }

  /* ────────────────────────────────────────────────────────────── */
  /* Large Tablets (Tablets Landscape, 769px-1024px) */
  /* ────────────────────────────────────────────────────────────── */
  @media (min-width: 769px) and (max-width: 1024px) {
    html { font-size: 16px; }
    
    .root { padding: 32px 24px; }
    
    .container { max-width: 620px; }
    
    .header { margin-bottom: 28px; }
    .header h1 { font-size: 30px; }
    .header p { font-size: 15px; }
    
    .card, .card-dark {
      padding: 24px;
      border-radius: 16px;
      margin-bottom: 20px;
    }
    
    .weeks-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    
    .week-btn {
      padding: 14px 0;
      font-size: 15px;
    }
    
    .submit-btn {
      padding: 18px;
      font-size: 17px;
    }
    
    .modal {
      max-width: 540px;
      padding: 32px;
    }
    
    .modal h2 { font-size: 24px !important; }
  }

  /* ────────────────────────────────────────────────────────────── */
  /* Desktop (Laptops/Desktops, 1025px-1440px) */
  /* ────────────────────────────────────────────────────────────── */
  @media (min-width: 1025px) and (max-width: 1440px) {
    html { font-size: 16px; }
    
    .root { 
      padding: 48px 32px 60px;
    }
    
    .container { max-width: 680px; }
    
    .header { margin-bottom: 32px; }
    .header h1 { font-size: 34px; }
    .header p { font-size: 16px; }
    
    .card, .card-dark {
      padding: 28px;
      border-radius: 16px;
      margin-bottom: 24px;
    }
    
    .lbl { font-size: 14px; }
    
    .input, .date-input {
      font-size: 16px;
      padding: 14px 18px 14px 54px;
    }
    
    .prefix {
      left: 16px;
      font-size: 15px;
    }
    
    .weeks-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    
    .week-btn {
      padding: 14px 0;
      font-size: 15px;
    }
    
    .preset-40 {
      padding: 10px 22px;
      font-size: 14px;
    }
    
    .badge {
      width: 36px;
      height: 36px;
      min-width: 36px;
      font-size: 13px;
    }
    
    .srow {
      padding: 14px 16px;
    }
    
    .submit-btn {
      padding: 18px;
      font-size: 18px;
    }
    
    .modal {
      max-width: 560px;
      padding: 36px;
    }
    
    .modal h2 { font-size: 26px !important; }
    
    .mrow {
      padding: 12px 0;
      font-size: 15px;
    }
  }

  /* ────────────────────────────────────────────────────────────── */
  /* Large Desktop (Wide Screens, 1441px+) */
  /* ────────────────────────────────────────────────────────────── */
  @media (min-width: 1441px) {
    html { font-size: 18px; }
    
    .root { 
      padding: 60px 40px 80px;
    }
    
    .container { max-width: 720px; }
    
    .header { margin-bottom: 36px; }
    .header h1 { font-size: 38px; }
    .header p { font-size: 17px; }
    
    .card, .card-dark {
      padding: 32px;
      border-radius: 18px;
      margin-bottom: 28px;
    }
    
    .lbl { font-size: 15px; }
    
    .input, .date-input {
      font-size: 17px;
      padding: 16px 20px 16px 58px;
    }
    
    .prefix {
      left: 18px;
      font-size: 16px;
    }
    
    .weeks-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    
    .week-btn {
      padding: 16px 0;
      font-size: 16px;
    }
    
    .preset-40 {
      padding: 12px 24px;
      font-size: 15px;
    }
    
    .badge {
      width: 40px;
      height: 40px;
      min-width: 40px;
      font-size: 14px;
    }
    
    .srow {
      padding: 16px 18px;
      margin-bottom: 10px;
    }
    
    .submit-btn {
      padding: 20px;
      font-size: 19px;
    }
    
    .modal {
      max-width: 600px;
      padding: 40px;
    }
    
    .modal h2 { font-size: 28px !important; }
    
    .mrow {
      padding: 14px 0;
      font-size: 16px;
    }
  }

  /* ────────────────────────────────────────────────────────────── */
  /* Orientation Specific Adjustments */
  /* ────────────────────────────────────────────────────────────── */
  
  /* Landscape orientation for small devices */
  @media (max-width: 896px) and (orientation: landscape) {
    .root { 
      padding: 12px; 
      min-height: 100vh;
    }
    
    .header { margin-bottom: 16px; }
    .header h1 { font-size: 20px; }
    .header p { font-size: 12px; }
    
    .card, .card-dark {
      padding: 14px;
      margin-bottom: 12px;
    }
    
    .submit-btn {
      margin-bottom: 16px;
    }
    
    .modal {
      max-height: 95vh;
    }
  }

  /* ────────────────────────────────────────────────────────────── */
  /* High DPI / Retina Displays */
  /* ────────────────────────────────────────────────────────────── */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .card, .card-dark {
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }
    
    .submit-btn, .btn-confirm {
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.35);
    }
  }

  /* ────────────────────────────────────────────────────────────── */
  /* Print Styles */
  /* ────────────────────────────────────────────────────────────── */
  @media print {
    .root {
      background: #fff;
      padding: 0;
    }
    
    .submit-btn, .preset-40, .week-btn {
      display: none;
    }
    
    .card, .card-dark {
      box-shadow: none;
      border: 1px solid #ddd;
      page-break-inside: avoid;
    }
    
    .modal {
      position: static;
      box-shadow: none;
    }
  }

  /* ────────────────────────────────────────────────────────────── */
  /* Accessibility - Prefers Reduced Motion */
  /* ────────────────────────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ────────────────────────────────────────────────────────────── */
  /* Dark Mode Support */
  /* ────────────────────────────────────────────────────────────── */
  @media (prefers-color-scheme: dark) {
    .root {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    }
    
    .card {
      background: #ebecf1;
      color: #f1f5f9;
      border: 1px solid #334155;
      border-left:4px solid #3b82f6;
      border-top: 4px solid #3b82f6;
    }
    
    .lbl {
      color: #020305;
    }
    
    .input, .date-input {
      background: #0f172a;
      color: #03080c;
      border-color: #334155;
    }
    
    .input::placeholder {
      color: #64748b;
    }
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
  const depositKsh = isAboveMax ? cashPrice : (isBelowMin ? rawVal : rawVal);
  const depositPct = cashPrice > 0 ? (depositKsh / cashPrice) * 100 : 0;
  const remaining  = Math.max(cashPrice - depositKsh, 0);
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

  const schedule = Array.from({ length: selectedWeeks }, (_, i) => {
    const d = startDate ? new Date(startDate) : null;
    if (d) d.setDate(d.getDate() + (i + 1) * 7);
    return { week: i + 1, date: d ? d.toISOString().split('T')[0] : null };
  });

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
        <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 700, color: '#1e293b' }}>Payment Summary</h2>
        {[
          ['Cash Price',             `Ksh ${cashPrice.toFixed(2)}`],
          startDate ? ['Start Date', fmtS(startDate)] : null,
          startDate ? ['End Date',   fmtS(endDate)]   : null,
          ['Deposit',                `Ksh ${depositKsh.toFixed(2)} (${depositPct.toFixed(1)}%)`],
          ['Balance After Deposit',  `Ksh ${remaining.toFixed(2)}`],
          ['Number of Weeks',        `${selectedWeeks} weeks`],
          ['Multiplier',             `${multiplier}x`],
          ['Weekly Installment',     `Ksh ${weekly.toFixed(2)}`],
          ['Total Weekly Payments',  `Ksh ${(weekly * selectedWeeks).toFixed(2)}`],
          ['Total to Pay',           `Ksh ${total.toFixed(2)}`],
          ['Interest Amount',        `Ksh ${interest.toFixed(2)}`],
        ].filter(Boolean).map(([label, value]) => (
          <div key={label} className="mrow">
            <span style={{ color: '#64748b', fontSize: 14, fontWeight: 600 }}>{label}</span>
            <span style={{ fontWeight: 700, fontSize: 14, textAlign: 'right', color: '#1e293b' }}>{value}</span>
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
                <span style={{ color: '#1d4ed8', fontWeight: 800, fontSize: 15 }}>
                  Ksh {depositKsh.toFixed(2)}
                </span>
              </div>
            )}
          </div>

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

          <div className="card-dark">
            <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 800 }}>Payment Breakdown</h3>
            {[
              ['Cash Price',            `Ksh ${cashPrice.toFixed(2)}`],
              ['Deposit',               `Ksh ${depositKsh.toFixed(2)} (${depositPct.toFixed(1)}%)`],
              ['Balance After Deposit', `Ksh ${remaining.toFixed(2)}`],
              ['Weekly Installment',    `Ksh ${weekly.toFixed(2)}`],
              ['Number of Weeks',       `${selectedWeeks} weeks`],
              
            ].map(([label, value]) => (
              <div key={label} className="brow">
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500 }}>{label}</span>
                <span style={{ fontWeight: 700, fontSize: 14, textAlign: 'right' }}>{value}</span>
              </div>
            ))}
          </div>

          {cashPrice > 0 && !isBelowMin && !isAboveMax && depositKsh > 0 && (
            <div className="card">
              <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 800, color: '#1e293b' }}>
                Payment Schedule
              </h3>

              <div style={{ display:'flex', alignItems:'center', padding:'12px 14px', background:'linear-gradient(135deg, #eff6ff, #dbeafe)', borderRadius:10, marginBottom:10, borderLeft: '4px solid #3b82f6' }}>
                <span style={{ fontSize:20, marginRight:12 }}>💳</span>
                <span style={{ flex:1, fontSize:14, color:'#374151', fontWeight:600 }}>
                  {startDate ? `Initial Deposit — ${fmtS(startDate)}` : 'Initial Deposit'}
                </span>
                <span style={{ fontWeight:800, color:'#1d4ed8' }}>Ksh {depositKsh.toFixed(2)}</span>
              </div>

              {schedule.map(p => (
                <div key={p.week} className="srow">
                  <div className="badge">{p.week}</div>
                  <span style={{ flex:1, fontSize:14, color:'#374151', fontWeight:500 }}>
                    {p.date ? `Week ${p.week} — ${fmtS(p.date)}` : `Week ${p.week}`}
                  </span>
                  <span style={{ fontWeight:700, color:'#1e293b' }}>Ksh {weekly.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          
        </div>
      </div>
    </>
  );
}