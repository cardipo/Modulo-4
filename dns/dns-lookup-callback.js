'use strict';

const dns = require('dns');

function dnsLookup(hostname, callback) {
  dns.lookup(hostname, (err, address, family) => {
    if (err) {
      return callback(err, null);
    }

    const data = {
      address,
      family,
    };

    return callback(null, data);
  });
}

module.exports = dnsLookup;
