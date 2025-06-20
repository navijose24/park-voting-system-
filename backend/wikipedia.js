const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function fetchNationalParks() {
  // Try to load from parks.json first
  const parksPath = path.join(__dirname, '../parks.json');
  if (fs.existsSync(parksPath)) {
    const data = fs.readFileSync(parksPath, 'utf-8');
    return JSON.parse(data);
  }
  // Fallback: Wikipedia API (old logic)
  const url = 'https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:National_parks_of_the_United_States&cmlimit=20&format=json';
  const res = await axios.get(url);
  const parks = res.data.query.categorymembers;

  // For each park, fetch summary and image
  const parkData = await Promise.all(parks.map(async (park) => {
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(park.title)}`;
    try {
      const summaryRes = await axios.get(summaryUrl);
      return {
        name: park.title,
        summary: summaryRes.data.extract,
        image: summaryRes.data.thumbnail ? summaryRes.data.thumbnail.source : null,
      };
    } catch (e) {
      return {
        name: park.title,
        summary: '',
        image: null,
      };
    }
  }));
  return parkData;
}

module.exports = { fetchNationalParks }; 