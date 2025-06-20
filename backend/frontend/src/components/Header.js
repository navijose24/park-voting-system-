import React from 'react';

const rainbow = 'linear-gradient(90deg, #ff5e62, #ff9966, #f9d423, #a8e063, #43cea2, #1976d2, #9d50bb)';
const textColor = '#7fffd4';

function Header({ onSignIn, onSignUp, bgColor }) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 32px',
      background: bgColor || '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      borderRadius: 12,
      marginBottom: 32,
    }}>
      <div style={{
        fontWeight: 800,
        fontSize: 28,
        background: rainbow,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        nps rank
      </div>
      <div>
        <button style={{
          border: `2px solid ${textColor}`,
          color: textColor,
          background: 'none',
          borderRadius: 8,
          padding: '8px 20px',
          fontWeight: 600,
          marginRight: 12,
          cursor: 'pointer',
          fontSize: 16,
        }} onClick={onSignIn}>Sign In</button>
        <button style={{
          border: 'none',
          color: '#fff',
          background: rainbow,
          borderRadius: 8,
          padding: '8px 20px',
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
        }} onClick={onSignUp}>Sign Up</button>
      </div>
    </header>
  );
}

export default Header; 