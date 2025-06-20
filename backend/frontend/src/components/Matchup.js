import React, { useState } from 'react';

const rainbow = 'linear-gradient(90deg, #ff5e62, #ff9966, #f9d423, #a8e063, #43cea2, #1976d2, #9d50bb)';
const rainbowColors = ['#ff5e62', '#ff9966', '#f9d423', '#a8e063', '#43cea2', '#1976d2', '#9d50bb'];
const defaultTextColor = '#7fffd4';

function truncate(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

function ParkCard({ park, rank, onVote, textColor }) {
  const [showFull, setShowFull] = useState(false);
  if (!park) return null;
  const maxSummary = 120;
  return (
    <div style={{
      borderRadius: 24,
      border: '4px solid',
      borderImage: `${rainbow} 1`,
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      background: '#111',
      width: 340,
      minHeight: 420,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      padding: 24,
      margin: 0,
      color: textColor || defaultTextColor,
    }}>
      <div style={{
        position: 'absolute',
        top: 18,
        right: 18,
        background: rainbow,
        color: '#fff',
        borderRadius: 12,
        padding: '2px 12px',
        fontWeight: 700,
        fontSize: 14,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>rank #{rank}</div>
      {park.image && <img src={park.image} alt={park.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 24, marginBottom: 16 }} />}
      <h2 style={{ fontWeight: 700, fontSize: 24, margin: '8px 0 8px 0', textAlign: 'center', color: textColor || defaultTextColor }}>{park.name}</h2>
      <div style={{ fontSize: 15, color: textColor || defaultTextColor, textAlign: 'center', minHeight: 60, maxHeight: 60, overflow: 'hidden', marginBottom: 16 }}>
        {showFull ? park.summary : truncate(park.summary, maxSummary)}
        {park.summary && park.summary.length > maxSummary && (
          <span style={{ color: rainbowColors[rank % rainbowColors.length], cursor: 'pointer', fontWeight: 600 }} onClick={() => setShowFull(!showFull)}>
            {showFull ? ' Show less' : ' Read more'}
          </span>
        )}
      </div>
      <button style={{
        border: 'none',
        color: '#fff',
        background: rainbow,
        borderRadius: 12,
        padding: '18px 0',
        fontWeight: 700,
        fontSize: 20,
        width: '100%',
        marginTop: 'auto',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        letterSpacing: 1,
      }} onClick={onVote}>
        Vote for this park
      </button>
    </div>
  );
}

function RainbowVS() {
  return (
    <div style={{
      alignSelf: 'center',
      background: '#111',
      borderRadius: 24,
      width: 80,
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '4px solid',
      borderImage: `${rainbow} 1`,
      margin: '0 8px',
      boxSizing: 'border-box',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <span style={{
        fontSize: 32,
        fontWeight: 700,
        background: rainbow,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
      }}>VS</span>
    </div>
  );
}

function Matchup({ parkA, parkB, onVote, onSkip, textColor }) {
  if (!parkA || !parkB) return <div style={{textAlign: 'center', margin: 32, color: textColor || defaultTextColor}}>Loading matchup...</div>;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 40, marginBottom: 24 }}>
      <ParkCard park={parkA} rank={parkA?.rank || 1} onVote={() => onVote('A')} textColor={textColor} />
      <RainbowVS />
      <ParkCard park={parkB} rank={parkB?.rank || 2} onVote={() => onVote('B')} textColor={textColor} />
    </div>
  );
}

export default function MatchupWrapper(props) {
  return (
    <div>
      <Matchup {...props} />
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <a href="#" style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'bold', fontSize: 16 }} onClick={props.onSkip}>Skip this matchup</a>
      </div>
    </div>
  );
} 