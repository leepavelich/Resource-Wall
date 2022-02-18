// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");

const pool = new Pool(dbParams);
// db.connect();

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

const getUserById = (userId) => {
  return pool
    .query(
      `SELECT * FROM users
        WHERE id = $1;
      `,
      [userId]
    )
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};

/** RESOURCES ROUTES */
// 1.
const getResourceComments = (resourceId) => {
  return pool
    .query(
      `SELECT comments.id AS comment_id, users.id AS user_id, comment, created_at, username, avatar_photo_url FROM comments
        INNER JOIN users ON comments.user_id = users.id
        WHERE resource_id = $1
        ORDER BY created_at DESC;
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

// 4.a
const removeComment = (commentId) => {
  return (
    pool
      .query(
        `DELETE FROM comments
          WHERE id = $1
      `,
        [commentId]
      )
      // returns newly created comment - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};

// 4.b
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
          WHERE user_id = $1 AND resource_id = $2
          RETURNING *;
      `,
        [user_id, resource_id]
      )
      // returns new rating - this may be unnecessary
      .then((result) => result.rows)
      .catch((err) => err.message)
  );
};

// 5.b
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
      `SELECT resources.id, users.id AS user_id, title, description, type, topic, url, image_url, created_at, username, resources.is_deleted
        FROM resources
        INNER JOIN users ON owner_id = users.id
        ORDER BY created_at;
      `
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};

// 9.c
const updateResource = (resource) => {
  const { id, title } = resource;

  return (
    pool
      .query(
        `UPDATE resources
        SET title = $2
        WHERE id = $1;
      `,
        [id, title]
      )
      // returns newly created resource - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};

// 9.b
const removeResource = (resource) => {
  const { id } = resource;

  return (
    pool
      .query(
        `UPDATE resources
        SET is_deleted = true
        WHERE id = $1;
      `,
        [id]
      )
      // returns newly created resource - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};

// 9.c
const addResource = (newResource) => {
  const { owner_id, title, description, type, topic, url, image_url } =
    newResource;

  return (
    pool
      .query(
        `INSERT INTO resources (owner_id, title, description, type, topic, url, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `,
        [owner_id, title, description, type, topic, url, image_url]
      )
      // returns newly created resource - this may be unnecessary
      .then((result) => result.rows[0])
      .catch((err) => err.message)
  );
};

module.exports = {
  getAllResources,
  getLikedByUser,
  getUserById,
  getResourceComments,
  getResourceRating,
  getLikes,
  removeComment,
  addComment,
  addLike,
  removeLike,
  addRating,
  removeRating,
  updateResource,
  removeResource,
  addResource,
};
