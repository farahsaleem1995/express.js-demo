const express = require("express");

var router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send(`
    <h1>
      Hello from ExpressJS
    </h1>
  `);
});

module.exports = router;
