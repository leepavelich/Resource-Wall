/*
 * All routes for Resources are defined here
 * Since this file is loaded in server.js into api/resources,
 *   these routes are mounted onto /resources
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (database) => {
  // 1. get all comments of a resource
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

  // 2. get average rating of a resource
  router.get("/:id/rating", (req, res) => {
    const { id } = req.params;

    database
      .getResourceRating(id)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // 3. get usernames of users who liked a resource
  router.get("/:id/likes", (req, res) => {
    const { id } = req.params;

    database
      .getLikes(id)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // 4. add new comment
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

  // 5.a clear rating if exists (always before inserting a new rating)
  router.post("/rating/clear", (req, res) => {
    const newRating = req.body;

    database
      .removeRating(newRating)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // 5. add rating
  router.post("/rating", (req, res) => {
    const newRating = req.body;

    database
      .addRating(newRating)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // 6. add like
  router.post("/likes", (req, res) => {
    const like = req.body;

    database
      .addLike(like)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // 7. remove like
  router.post("/unlike", (req, res) => {
    const like = req.body;

    database
      .removeLike(like)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // 8. retrive all resources
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

  // 9. add new resource
  router.post("/", (req, res) => {
    const newResource = req.body;

    database
      .addResource(newResource)
      .then(() => res.redirect("/"))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};
