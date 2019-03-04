'use strict';

const dns = require('dns');

function dnsLookup(hostname) {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err, address, family) => {
      if (err) {
        return reject(err);
      }

      const data = {
        address,
        family,
      };

      return resolve(data);
    });
  });
}

module.exports = dnsLookup;
