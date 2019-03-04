'use strict';

async function getUserProfile(req, res, next) {
  return res.status(200).send(req.claims);
}

module.exports = getUserProfile;
