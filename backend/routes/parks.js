const express = require('express');
const { getParks } = require('../models/Park');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(getParks());
});

module.exports = router; 