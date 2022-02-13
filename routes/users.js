/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (database) => {
  // get all resources likes by a user
  router.get("/:id/liked", (req, res) => {
    const { id } = req.params;

    database
      .getLikedByUser(id)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // get info from a single user
  // /:id

  return router;
};
