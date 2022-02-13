/*
 * All routes for Resources are defined here
 * Since this file is loaded in server.js into api/resources,
 *   these routes are mounted onto /resources
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (database) => {
  router.get("/:id/comments", (req, res) => {
    const { id } = req.params;

    database
      .getResourceComments(id)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/comments", (req, res) => {
    const newComment = req.body;

    database
      .addComment(newComment)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/likes", (req, res) => {
    const newLike = req.body;

    database
      .addLike(newLike)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.get("/:id/ratings", (req, res) => {
    const { id } = req.params;

    database
      .getResourceRatings(id)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/", (req, res) => {
    const newResource = req.body;

    database
      .addResource(newResource)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.get("/", (req, res) => {
    // const userId = req.session.userId;
    // if (!userId) {
    //   res.error("Not logged in");
    //   return;
    // } PROBABLY WILL DELETE
    database
      .getAllResources()
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};
