const express = require("express");
const router = express.Router();

module.exports = () => {
  // may have to change to POST & redirect
  router.get("/:id/login", (req, res) => {
    const { id } = req.params;
    res.cookie("user_id", id);
    res.redirect("/");
  });

  router.get("/logout", (req, res) => {
    res.clearCookie("user_id");
    res.redirect("/");
  });

  return router;
};
