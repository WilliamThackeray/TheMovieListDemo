var express = require("express");
var router = express.Router();

/* GET movies */
router.get("/", function (req, res, next) {
  res.send("get request for list of movies");
});

/* PUT  */

module.exports = router;
