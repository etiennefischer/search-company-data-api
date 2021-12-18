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

app.get('/search', (request, response) => {

	const searchQuery = request.query.searchquery;

	if(searchQuery != null) {

		searchLinkedIn(searchQuery)
			.then(results => {
				response.set('Access-Control-Allow-Origin', '*');
				response.status(200);
				response.json(results);
			});
	} else {
		response.end();
	}
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));