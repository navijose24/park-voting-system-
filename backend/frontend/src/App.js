import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Matchup from './components/Matchup';
import Leaderboard from './components/Leaderboard';
import RecentVotes from './components/RecentVotes';

const API = 'http://localhost:5000/api';
const rainbow = 'linear-gradient(90deg, #ff5e62, #ff9966, #f9d423, #a8e063, #43cea2, #1976d2, #9d50bb)';
const textColor = '#7fffd4'; // light blueish green

function AuthModal({ type, onClose }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#222', borderRadius: 18, padding: 36, minWidth: 340, boxShadow: '0 4px 32px rgba(0,0,0,0.12)', position: 'relative', color: textColor }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: textColor }}>×</button>
        <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 26, marginBottom: 18 }}>{type === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={e => { e.preventDefault(); onClose(); }}>
          <input type="email" placeholder="Email" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #444', marginBottom: 16, fontSize: 16, background: '#111', color: textColor }} />
          <input type="password" placeholder="Password" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #444', marginBottom: 24, fontSize: 16, background: '#111', color: textColor }} />
          <button type="submit" style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: rainbow, color: '#fff', fontWeight: 700, fontSize: 18, cursor: 'pointer', letterSpacing: 1 }}>Submit</button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [parks, setParks] = useState([]);
  const [matchup, setMatchup] = useState([]);
  const [recentVotes, setRecentVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'signin' or 'signup' or null

  const fetchParks = async () => {
    const res = await fetch(`${API}/parks`);
    setParks(await res.json());
  };
  const fetchMatchup = async () => {
    const res = await fetch(`${API}/matchup`);
    setMatchup(await res.json());
  };
  const fetchRecentVotes = async () => {
    const res = await fetch(`${API}/recent-votes`);
    setRecentVotes(await res.json());
  };

  useEffect(() => {
    fetchParks();
    fetchMatchup();
    fetchRecentVotes();
  }, []);

  const handleVote = async (winner) => {
    setLoading(true);
    await fetch(`${API}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parkA: matchup[0],
        parkB: matchup[1],
        winner,
      }),
    });
    await fetchParks();
    await fetchMatchup();
    await fetchRecentVotes();
    setLoading(false);
  };

  const handleSkip = () => {
    fetchMatchup();
  };

  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: textColor }}>
      <Header onSignIn={() => setAuthModal('signin')} onSignUp={() => setAuthModal('signup')} bgColor="#000" />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
        <h1 style={{ textAlign: 'center', fontWeight: 700, fontSize: 32, marginBottom: 32, color: textColor }}>Which park would you rather visit?</h1>
        <Matchup parkA={matchup[0]} parkB={matchup[1]} onVote={handleVote} onSkip={handleSkip} textColor={textColor} />
        {loading && <div>Loading...</div>}
        <Leaderboard parks={parks} textColor={textColor} />
        <RecentVotes recentVotes={recentVotes} textColor={textColor} />
      </div>
      {authModal && <AuthModal type={authModal} onClose={() => setAuthModal(null)} />}
    </div>
  );
}

export default App;
