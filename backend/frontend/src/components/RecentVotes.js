import React from 'react';

const rainbowColors = ['#ff5e62', '#ff9966', '#f9d423', '#a8e063', '#43cea2', '#1976d2', '#9d50bb'];
const textColor = '#7fffd4';
const timeColor = '#b0bfc7';
function randomColor() {
  return rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
}

function RecentVotes({ recentVotes }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ color: textColor, fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Recent Votes</h3>
      <ul style={{ listStyle: 'none', padding: 0, background: 'transparent' }}>
        {recentVotes.map((vote, i) => (
          <li key={i} style={{ marginBottom: 6, fontSize: 15, color: textColor, background: '#fff', borderRadius: 16, padding: '6px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', backgroundColor: '#000', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: randomColor(), fontWeight: 600 }}>{vote.matchup.parkA}</span>
            <span style={{ color: textColor }}> vs </span>
            <span style={{ color: randomColor(), fontWeight: 600 }}>{vote.matchup.parkB}</span>
            <span style={{ color: textColor }}> — Winner: </span>
            <span style={{ color: randomColor(), fontWeight: 700 }}>{vote.winner}</span>
            <span style={{ color: timeColor, fontSize: 12, marginLeft: 6 }}>({new Date(vote.time).toLocaleTimeString()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentVotes; 