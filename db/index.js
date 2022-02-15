// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");

const pool = new Pool(dbParams);
// db.connect();

// /**
//  * Get a single user from the database given their email.
//  * @param {String} email The email of the user.
//  * @return {Promise<{}>} A promise to the user.
//  */
// const getUserWithEmail = (email) => {
//   return pool
//     .query("SELECT * FROM users WHERE email = $1;", [email])
//     .then((result) => result.rows[0])
//     .catch((err) => err.message);
// };
/** USERS ROUTES **/
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

/** RESOURCES ROUTES */
// 1.
const getResourceComments = (resourceId) => {
  return pool
    .query(
      `SELECT comment, comments.created_at, username, avatar_photo_url FROM comments
        INNER JOIN users ON comments.user_id = users.id
        WHERE resource_id = $1;
      `,
      [resourceId]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};

// 2.
const getResourceRating = (resourceId) => {
  return pool
    .query(
      `SELECT ROUND(AVG(rating)) AS average_rating, COUNT(ratings) AS num_ratings
        FROM ratings
        WHERE resource_id = $1
        GROUP BY resource_id;
      `,
      [resourceId]
    )
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

// 3.
const getLikes = (resourceId) => {
  return (
    pool
      .query(
        `SELECT username, user_id FROM users
          INNER JOIN likes ON users.id = likes.user_id
          WHERE likes.resource_id = $1;
      `,
        [resourceId]
      )
      // returns newly created like - this may be unnecessary
      .then((result) => result.rows)
      .catch((err) => err.message)
  );
};

// 4.
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

// 5.a
const removeRating = (newRating) => {
  const { user_id, resource_id } = newRating;

  return (
    pool
      .query(
        `
        DELETE FROM ratings
          WHERE user_id = $1 AND resource_id = $2;
      `,
        [user_id, resource_id]
      )
      // returns new rating - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};

// 5.
const addRating = (newRating) => {
  const { user_id, resource_id, rating } = newRating;

  // update if exists, else insert
  return (
    pool
      .query(
        `
        INSERT INTO ratings (user_id, resource_id, rating)
          VALUES ($1, $2, $3)
          RETURNING *;
      `,
        [user_id, resource_id, rating]
      )
      // returns new rating - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};

// 6.
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

// 7.
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

// 8.
const getAllResources = () => {
  return pool
    .query(
      `SELECT resources.id, title, description, type, topic, url, resources.created_at, username
        FROM resources
        INNER JOIN users ON owner_id = users.id;
      `
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};

// 9.
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

// (optional for now)
// addUser
// updateRating
// removeRating
// removeComment

module.exports = {
  getAllResources,
  getLikedByUser,
  getResourceComments,
  getResourceRating,
  getLikes,
  addResource,
  addComment,
  addLike,
  removeLike,
  addRating,
  removeRating,
};
