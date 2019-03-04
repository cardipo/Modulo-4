'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;

<<<<<<< HEAD
const mongoUri = process.env.Mongo_URI;

async function openConnection() {
    const conn = await mongoose(mongoUri, { userNewUrlParsers: true});

    return conn;
}
    async function disconnect() {
        mongoose.connection.close();
    }
module.exports = {
    connect: openConnection,

    disconnect,


};
=======
const mongoUri = process.env.MONGO_URI;

async function openConnection() {
  const conn = await mongoose.connect(mongoUri, { useNewUrlParser: true });

  return conn;
}

async function disconnect() {
  mongoose.connection.close();
}

module.exports = {
  connect: openConnection,
  disconnect,
};
>>>>>>> 0ec70e7420cafcfe74262d0655d753012373c7fe
