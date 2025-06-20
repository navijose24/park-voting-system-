// ELO rating calculation
function calculateElo(ratingA, ratingB, winner, k = 32) {
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));
  let scoreA, scoreB;
  if (winner === 'A') {
    scoreA = 1;
    scoreB = 0;
  } else {
    scoreA = 0;
    scoreB = 1;
  }
  const newA = Math.round(ratingA + k * (scoreA - expectedA));
  const newB = Math.round(ratingB + k * (scoreB - expectedB));
  return { newA, newB };
}

module.exports = { calculateElo }; 