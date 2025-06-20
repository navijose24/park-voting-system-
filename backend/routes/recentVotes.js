const express = require('express');
const { getRecentVotes } = require('../models/Park');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(getRecentVotes());
});

module.exports = router; 