const express = require('express');
const { updateElo, logVote } = require('../models/Park');
const { calculateElo } = require('../elo');
const router = express.Router();

router.post('/', (req, res) => {
  const { parkA, parkB, winner } = req.body;
  if (!parkA || !parkB || !['A', 'B'].includes(winner)) {
    return res.status(400).json({ error: 'Invalid vote data' });
  }
  const ratingA = parkA.elo;
  const ratingB = parkB.elo;
  const { newA, newB } = calculateElo(ratingA, ratingB, winner);
  updateElo(parkA.name, parkB.name, winner, newA, newB);
  logVote({ parkA: parkA.name, parkB: parkB.name }, winner);
  res.json({ newA, newB });
});

module.exports = router; 