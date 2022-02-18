/*
 * All routes for Resources are defined here
 * Since this file is loaded in server.js into api/resources,
 *   these routes are mounted onto /resources
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

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

  // 4.a remove comment
  router.post("/comments/remove", (req, res) => {
    const { comment_id } = req.body;

    database
      .removeComment(comment_id)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // 4.b add new comment
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

  // 5.b add rating
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

  // 8. retrieve all resources
  router.get("/", (req, res) => {
    database
      .getAllResources()
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

 // 9.a update title of a resource
  router.post("/update", (req, res) => {
    const updatedResource = req.body;

    database
      .updateResource(updatedResource)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // 9.b soft delete a resource
  router.post("/remove", (req, res) => {
    const resourceId = req.body;

    database
      .removeResource(resourceId)
      .then((resources) => res.send({ resources }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // 9.c add new resource
  router.post("/", (req, res) => {
    const newResource = req.body;
    const data = { key: process.env.API_KEY, q: req.body.url };

    fetch("https://api.linkpreview.net", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status != 200) {
          console.log(res.status);
          throw new Error("something went wrong");
        }
        return res.json();
      })
      .then((response) => {
        newResource.image_url = response.image;
        newResource.title = response.title;
        newResource.description = response.description;

        console.log(newResource);

        database
          .addResource(newResource)
          .then(() => res.redirect("/"))
          .catch((e) => {
            console.error(e);
            res.send(e);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};
