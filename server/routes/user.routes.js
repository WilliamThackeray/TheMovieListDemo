// var express = require("express");
// var router = express.Router();

// /* GET all users */
// router.get("/", function (req, res, next) {
//   res.send("GET request for all users");
// });

// module.exports = router;

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // get all users
  app.get("/api/users", users.findAll);

  app.use("/api/users", router);
};
