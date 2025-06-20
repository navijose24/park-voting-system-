import React from 'react';

const rainbow = 'linear-gradient(90deg, #ff5e62, #ff9966, #f9d423, #a8e063, #43cea2, #1976d2, #9d50bb)';
const rainbowColors = ['#ff5e62', '#ff9966', '#f9d423', '#a8e063', '#43cea2', '#1976d2', '#9d50bb'];
const defaultTextColor = '#7fffd4';
function randomColor() {
  return rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
}

function Leaderboard({ parks, textColor }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ color: randomColor(), fontWeight: 700, fontSize: 28, marginBottom: 16 }}>rankings</h2>
      <div style={{ borderRadius: 24, overflow: 'hidden', border: '6px solid', borderImage: `${rainbow} 1`, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#000' }}>
          <thead>
            <tr style={{ background: '#111' }}>
              <th style={{ padding: 12, color: randomColor(), fontWeight: 700, fontSize: 18 }}>Rank</th>
              <th style={{ padding: 12, color: randomColor(), fontWeight: 700, fontSize: 18 }}>Park</th>
              <th style={{ padding: 12, color: randomColor(), fontWeight: 700, fontSize: 18 }}>ELO</th>
              <th style={{ padding: 12, color: randomColor(), fontWeight: 700, fontSize: 18 }}>Votes</th>
              <th style={{ padding: 12, color: randomColor(), fontWeight: 700, fontSize: 18 }}>Change</th>
            </tr>
          </thead>
          <tbody>
            {parks.map((park, i) => (
              <tr key={park.name} style={{ background: i % 2 ? '#111' : '#000' }}>
                <td style={{ padding: 12, color: randomColor() }}>{i + 1}</td>
                <td style={{ padding: 12, color: randomColor() }}>{park.name}</td>
                <td style={{ padding: 12, color: randomColor() }}>{park.elo}</td>
                <td style={{ padding: 12, color: randomColor() }}>{park.votes}</td>
                <td style={{ padding: 12, color: randomColor() }}>{park.lastChange > 0 ? `+${park.lastChange}` : park.lastChange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard; 