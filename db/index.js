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
    .query("SELECT * FROM users WHERE email = $1;", [email])
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

/**
 * Get all resources for all users.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllResources = () => {
  return pool
    .query("SELECT * FROM resources;")
    .then((result) => result.rows)
    .catch((err) => err.message);
};

const getLikedByUser = (userId) => {
  return pool
    .query(
      `SELECT * FROM resources
        INNER JOIN likes ON resources.id = likes.resource_id
        WHERE likes.user_id = $1;
      `,
      [userId]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};

const getOwnedByUser = (userId) => {
  return pool
    .query(
      `SELECT * FROM resources
        WHERE owner_id = $1;
      `,
      [userId]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};

const getResourceComments = (resourceId) => {
  return pool
    .query(
      `SELECT * FROM comments
        WHERE resource_id = $1;
      `,
      [resourceId]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};

const getResourceRatings = (resourceId) => {
  return pool
    .query(
      `SELECT ROUND(AVG(rating), 1) AS average_rating
        FROM ratings
        WHERE resource_id = $1
        GROUP BY resource_id;
      `,
      [resourceId]
    )
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

const addResource = (newResource) => {
  const { owner_id, title, description, type, topic, url } = newResource;

  return (
    pool
      .query(
        `INSERT INTO resources (owner_id, title, description, type, topic, url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `,
        [owner_id, title, description, type, topic, url]
      )
      // returns newly created resource - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};

const addComment = (newComment) => {
  const { user_id, resource_id, comment } = newComment;

  return (
    pool
      .query(
        `INSERT INTO comments (user_id, resource_id, comment)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
        [user_id, resource_id, comment]
      )
      // returns newly created comment - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};

const addLike = (like) => {
  const { user_id, resource_id } = like;

  return (
    pool
      .query(
        `INSERT INTO likes (user_id, resource_id)
        VALUES ($1, $2)
        RETURNING *;
      `,
        [user_id, resource_id]
      )
      // returns newly created like - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};

const removeLike = (like) => {
  const { user_id, resource_id } = like;

  return (
    pool
      .query(
        `DELETE FROM likes
          WHERE user_id = $1
          AND resource_id = $2;
      `,
        [user_id, resource_id]
      )
      // returns empty object - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};
// addRating

// (optional for now)
// addUser
// updateRating
// removeRating
// removeComment

module.exports = {
  getUserWithEmail,
  getAllResources,
  getLikedByUser,
  getOwnedByUser,
  getResourceComments,
  getResourceRatings,
  addResource,
  addComment,
  addLike,
  removeLike,
};
