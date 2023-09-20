const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const cors = require('cors')
const fs = require('fs');

require('dotenv').config();

const app = express();
const staticFile = express.static(path.join(__dirname, '/html/build'));

const hostname = '0.0.0.0';
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(staticFile);

app.use(history());

app.use(staticFile);

app.get('/', (req, res) => {
  res.render(__dirname + '/index.html');
});

const server = app.listen(port, hostname, () => {
  console.log('listening on port %s...', server.address().port);
});