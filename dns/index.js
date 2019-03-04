'use strict';

const dnsLookupCallback = require('./dns-lookup-callback');
const dnsLookupPromise = require('./dns-lookup-promise');
const dnsLookupAsync = require('./dns-lookup-async');

const hostname = 'hack-a-bos.com';

dnsLookupCallback(hostname, (err, data) => {
  if (err) {
    return console.error('dnsLookupCallback error', err);
  }

  return console.log('dnsLookupCallback', data);
});

dnsLookupPromise(hostname).then((data) => {
  console.log('dnsLookupPromise', data);
}).catch((err) => {
  console.error('dnsLookupPromise error', err);
});


/**
 * To use async/await, we must to be inside an async function
 * so, we are creating a function named runAsync to call to our
 * dnsLookupAsync function
 */
async function runAsync() {
  try {
    const data = await dnsLookupAsync(hostname);
    console.log('dnsLookupAsync', data);
  } catch (err) {
    console.log('dnsLookupAsync error', err);
  }
}

runAsync();
