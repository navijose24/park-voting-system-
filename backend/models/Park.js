// In-memory park data
let parks = [];
let recentVotes = [];

function initializeParks(parkList) {
  parks = parkList.map(park => ({
    ...park,
    elo: 1500,
    votes: 0,
    lastChange: 0,
  }));
}

function getParks() {
  return parks.sort((a, b) => b.elo - a.elo);
}

function getRandomMatchup() {
  if (parks.length < 2) return [];
  const idxs = [];
  while (idxs.length < 2) {
    const idx = Math.floor(Math.random() * parks.length);
    if (!idxs.includes(idx)) idxs.push(idx);
  }
  return [parks[idxs[0]], parks[idxs[1]]];
}

function updateElo(nameA, nameB, winner, newA, newB) {
  const parkA = parks.find(p => p.name === nameA);
  const parkB = parks.find(p => p.name === nameB);
  if (parkA && parkB) {
    parkA.lastChange = newA - parkA.elo;
    parkB.lastChange = newB - parkB.elo;
    parkA.elo = newA;
    parkB.elo = newB;
    parkA.votes++;
    parkB.votes++;
  }
}

function logVote(matchup, winner) {
  recentVotes.unshift({ matchup, winner, time: new Date() });
  if (recentVotes.length > 10) recentVotes.pop();
}

function getRecentVotes() {
  return recentVotes;
}

module.exports = {
  initializeParks,
  getParks,
  getRandomMatchup,
  updateElo,
  logVote,
  getRecentVotes,
}; 