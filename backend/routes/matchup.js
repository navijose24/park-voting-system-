const express = require('express');
const { getRandomMatchup } = require('../models/Park');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(getRandomMatchup());
});

module.exports = router; 