const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successfull Authentication.
    res.redirect("/profile");
  }
);

module.exports = router;
