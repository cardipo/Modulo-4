'use strict';

const dns = require('dns');
const { promisify } = require('util');

const lookup = promisify(dns.lookup);

async function dnsLookup(hostname) {
  /**
   * lookup is dns.lookup BUT we promisified it, that means is returning a new Promise, so
   * we can use the syntax sugar await instead of chain resolve/reject methods
   */
  const { address, family } = await lookup(hostname);

  const data = {
    address,
    family,
  };

  return data;
}

module.exports = dnsLookup;
