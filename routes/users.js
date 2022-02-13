/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (database) => {
  router.get("/liked/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);

    database
      .getLikedByUser(id)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.get("/owned/:id", (req, res) => {
    const { id } = req.params;

    database
      .getOwnedByUser(id)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};
