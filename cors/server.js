'use strict';

const express = require('express');
const bodyParser = require('body-parser');

/**
 * Example with no cors problems:
 *  Frontend and backend running on same domain
 */
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-market');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.post('/login', (req, res) => {
  const market = req.headers['x-market'];
  const {
    username,
    password,
  } = req.body;

  if (!market) {
    return res.status(400).send('market is mandatory');
  }

  if (!username || !password) {
    return res.status(401).send('Credentials are wrong');
  }

  return res.status(200).json({
    message: 'access granted',
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
