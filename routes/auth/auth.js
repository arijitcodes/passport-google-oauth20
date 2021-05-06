const express = require("express");
const app = express();
const router = express.Router();

// app.use("/google/callback", require("./google/authGoogleCallback"));
// app.use("/google", require("./google/authGoogle"));

router.use("/google/callback", require("./google/authGoogleCallback"));
router.use("/google", require("./google/authGoogle"));

module.exports = router;
