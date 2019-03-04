'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
const uuidV4 = require('uuid/v4');
const mysql = require ('mysql2/promise');
const sendgridMail = require('@sendgrid/mail');

sendgridMail.setApiKey(process.env.SENGRID_API_KEY);

// create the connection to database
let connection = null;
(async () => {
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'socialnetwork',
    password: 'password',
  });
})();
//simple query
/*
connection.query(
  'SELECT 1 + 1',
  function(err, results, fields){
    console.log(results);//result contains rows returned by servers
    console.log(fields);//fields contains extra metadata about results, if available
  }
)*/
=======
const sendgridMail = require('@sendgrid/mail');
const uuidV4 = require('uuid/v4');
const mysqlPool = require('../../../databases/mysql-pool');
const UserModel = require('../../../models/user-model');

sendgridMail.setApiKey(process.env.SENGRID_API_KEY);

/**
 * Insert the user into the database generating an uuid and calculating the bcrypt password
 * @param {String} email
 * @param {String} password
 * @return {String} uuid
 */
async function insertUserIntoDatabase(email, password) {
  const securePassword = await bcrypt.hash(password, 10);
  const uuid = uuidV4();
  const now = new Date();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');

  console.log('secure password', securePassword);
  console.log('createdAt', createdAt);
  console.log('uuid', uuid);

  const connection = await mysqlPool.getConnection();

  await connection.query('INSERT INTO users SET ?', {
    uuid,
    email,
    password: securePassword,
    created_at: createdAt,
  });

  return uuid;
}

/**
 * @param {String} uuid
 * @param {String} verificationCode
 */
async function addVerificationCode(uuid) {
  const verificationCode = uuidV4();
  const now = new Date();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
  const sqlQuery = 'INSERT INTO users_activation SET ?';
  const connection = await mysqlPool.getConnection();

  await connection.query(sqlQuery, {
    user_uuid: uuid,
    verification_code: verificationCode,
    created_at: createdAt,
  });

  connection.release();

  return verificationCode;
}

async function createUserProfile(uuid) {
  const userProfileData = {
    uuid,
    avatarUrl: null,
    fullName: null,
    friends: [],
    preferences: {
      isPublicProfile: false,
      linkedIn: null,
      twitter: null,
      github: null,
      description: null,
    },
  };

  try {
    const userCreated = await UserModel.create(userProfileData);

    console.log(userCreated);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Send an email with a verification link to the user to activate the account
 * @param {String} userEmail
 * @param {String} verificationCode
 * @return {Object} Sengrid response
 */
async function sendEmailRegistration(userEmail, verificationCode) {
  const msg = {
    to: userEmail,
    from: {
      email: 'socialnetwork@yopmail.com',
      name: 'Social Network :)',
    },
    subject: 'Welcome to Hack a Bos Social Network',
    text: 'Start meeting people of your interests',
    html: `To confirm the account <a href="${process.env.HTTP_SERVER_DOMAIN}/api/account/activate?verification_code=${verificationCode}">activate it here</a>`,
  };

  const data = await sendgridMail.send(msg);

  return data;
}
>>>>>>> 0ec70e7420cafcfe74262d0655d753012373c7fe

async function validateSchema(payload) {
  /**
   * TODO: Fill email, password and full name rules to be (all fields are mandatory):
   *  email: Valid email
   *  password: Letters (upper and lower case) and number
   *    Minimun 3 and max 30 characters, using next regular expression: /^[a-zA-Z0-9]{3,30}$/
   * fullName: String with 3 minimun characters and max 128
   */
  const schema = {
<<<<<<< HEAD
    email: Joi.string().email({ minDomainAtoms: 2}).required(),
    password: Joi.string().regex(/^[a-zA-z0-9]{3,30}$/).required(),
    // email: rules.email,
    // password: rules.password,
=======
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
>>>>>>> 0ec70e7420cafcfe74262d0655d753012373c7fe
    // fullName: rules.fullName,
  };

  return Joi.validate(payload, schema);
}

async function create(req, res, next) {
  const accountData = { ...req.body };

  /**
   * Validate if user data is valid to create an account
   * in other case, generate a 400 Bad Reqeust error
   */
  try {
    await validateSchema(accountData);
  } catch (e) {
    // Create validation error
    return res.status(400).send(e);
  }

  const {
    email,
    password,
  } = accountData;

    /**
<<<<<<< HEAD
     * TODO: Insert user into MySQL
     *  hash the password using bcrypt library
     */
    const securePassword = await bcrypt.hash(password,10);
    const uuid = uuidV4();
    const now = new Date();
    const createdAt = now.toISOString().substring(0, 19).replace('T',' ');

    /**
     * TODO: Insert user into mysql and get the user uuid
     */
    try {
      await connection.query('  insert into users SET ?',{
        uuid,
        email,
        password: securePassword,
        created_at: createdAt,
      });
    } catch (e) {
      console.error(e);
      return res.status(409).send(e.message);
    }
=======
     * Create the user and send response
     */
    const uuid = await insertUserIntoDatabase(email, password);
    res.status(204).json();
>>>>>>> 0ec70e7420cafcfe74262d0655d753012373c7fe

    /**
     * We are going to creaate minimum structure in mongodb
     */
<<<<<<< HEAD
    const verificationCode = uuidV4();
    try {
      await connection.query('INSERT INTO users_activation SET ?', {
user_uuid: uuid,
verification_code: verificationCode,
created_at: createdAt,
      });
    } catch(e) {
      return res.status(409).send(e.message);
    }
    
=======
    await createUserProfile(uuid);
>>>>>>> 0ec70e7420cafcfe74262d0655d753012373c7fe

    /**
     * Generate verification code and send email
     */
    try {
<<<<<<< HEAD
      /**
       * Send email to the user adding the verificationCode in the link
       */
      const msg = {
        to: email,
        from: {
          email: 'socialnetwork@yopmail.com',
          name: 'Social Network :)',
        },
        subject: 'Welcome to Hack a Bos Social Network',
        text: 'Start meeting people of your interests',
        html: `To confirm the account <a href="http://localhost:8000/api/account/activate?verification_code=${verificationCode}">activate it here</a>`,
      };
    
      const data = await sendgridMail.send(msg);
      console.log('data',data);
=======
      const verificationCode = await addVerificationCode(uuid);
      await sendEmailRegistration(email, verificationCode);
>>>>>>> 0ec70e7420cafcfe74262d0655d753012373c7fe
    } catch (e) {
      console.error('Sengrid error', e);
    }
}

module.exports = create;
