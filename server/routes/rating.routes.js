module.exports = (app) => {
  const rating = require("../controllers/rating.controller.js");

  var router = require("express").Router();

  // create a new rating
  app.post("/api/rating", rating.createOne);

  // get all ratings for one user
  app.get("/api/rating/:ratingType", rating.findAllRatingsFor);

  // // put a change for a rating
  // app.put("/api/rating/:ratingId", rating.update);

  // // get all rating
  // app.get("/api/rating", rating.findAll);

  // delete one rating
  app.delete("/api/rating/:ratingId", rating.deleteOne);

  app.use("/api/rating", router);
};
