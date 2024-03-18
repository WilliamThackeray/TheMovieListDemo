// var express = require("express");
// var router = express.Router();

// /* GET all users */
// router.get("/", function (req, res, next) {
//   res.send("GET request for all users");
// });

// module.exports = router;

module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // create a new user
  app.post("/api/user", user.createOne);

  // get a single user
  app.get("/api/user/:username", user.findOne);

  // put a change for a user
  app.put("/api/user/:userId", user.update);

  // get all user
  app.get("/api/user", user.findAll);

  // delete one user
  app.delete("/api/user/:username", user.deleteOne);

  app.use("/api/user", router);
};
