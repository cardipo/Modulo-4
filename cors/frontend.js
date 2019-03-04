'use strict';

const express = require('express');

/**
 * Example with no cors problems:
 *  Frontend and backend running on same domain
 */
const app = express();

app.use(express.static('public'));

app.listen(3001, () => {
  console.log('listening on port 3001');
});
