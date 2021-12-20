require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

const searchLinkedIn = require('./searchLinkedIn');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/search', async (request, response) => {
	const { searchquery } = request.query;

  if (!searchquery) {
    return response.end()
  }

  try {
    const results = await searchLinkedIn(searchquery)

    response.set('Access-Control-Allow-Origin', '*');
    response.status(200);
    response.json(results);
  } catch (err) {
      return response
        .status(500)
        .json({
            error: err.message
        })
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));