const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(
      "Secret Data<br><br><a href='/login'>LogIn</a> | <a href='/logout'>Logout</a> | <a href='/profile'>Profile</a>"
    );
  } else {
    return res.send(
      "Unauthorized request!<br><br><a href='/login'>LogIn</a> | <a href='/logout'>Logout</a> | <a href='/profile'>Profile</a>"
    );
  }
});

module.exports = router;
