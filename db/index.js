// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");

const pool = new Pool(dbParams);
// db.connect();

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
 const getUserWithEmail = (email) => {
  return pool
    .query('SELECT * FROM users WHERE email = $1', [email])
    .then((result) => result.rows[0])
    .catch((err) => err.message);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get all resources for all users.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
 const getAllResources = () => {
  return pool
    .query('SELECT * FROM resources')
    .then((result) => result.rows)
    .catch((err) => err.message);
}
exports.getAllResources = getAllResources;
