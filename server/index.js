const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const dbHelpers = require('../database/dbHelpers.js');

// Server
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Route to search for locations by city
app.get('/nav/search/locations/:term', (req, res) => {
  dbHelpers.searchLocations(req.params.term, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

// Route to search for camps by name
app.get('/nav/search/camps/:term', (req, res) => {
  dbHelpers.searchCamps(req.params.term, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

// Port and connection
let port = 3001;
app.listen(port, () => console.log(`Connected and listening at port ${port}`));