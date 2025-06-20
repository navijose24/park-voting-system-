const express = require('express');
const cors = require('cors');
const parksRouter = require('./routes/parks');
const matchupRouter = require('./routes/matchup');
const voteRouter = require('./routes/vote');
const recentVotesRouter = require('./routes/recentVotes');
const { fetchNationalParks } = require('./wikipedia');
const ParkModel = require('./models/Park');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/parks', parksRouter);
app.use('/api/matchup', matchupRouter);
app.use('/api/vote', voteRouter);
app.use('/api/recent-votes', recentVotesRouter);

const PORT = process.env.PORT || 5000;
fetchNationalParks().then(parks => {
  ParkModel.initializeParks(parks);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Parks initialized:', parks.length);
  });
}); 