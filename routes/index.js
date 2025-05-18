const express = require("express");
const router = express.Router();

// Hello World route
router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
