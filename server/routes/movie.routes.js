module.exports = (app) => {
  const movie = require("../controllers/movie.controller.js");

  var router = require("express").Router();

  // create a new movie
  app.post("/api/movie", movie.createOne);

  // find one movie
  app.get("/api/movie/:movieId", movie.findOne);

  // // get all movies
  // app.get("/api/movie", movie.findAll);

  // put a change for a movie
  app.put("/api/movie/:movieId", movie.update);

  // // delete a movie
  // app.delete("/api/movie/:movieId", movie.deleteOne);

  app.use("/api/movie", router);
};
