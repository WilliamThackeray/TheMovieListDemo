const Movie = require("../models/movie.model.js");

exports.createOne = async (req, res) => {
  console.log("movie | create one");

  const data = req.body;

  let movieResult = await Movie.create({ data });
  if (!movieResult) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while creating the movie",
    });
  } else {
    res.status(200).send({
      message: "Movie created successfully",
      movie: movieResult,
    });
  }
};

exports.findOne = async (req, res) => {
  const movieId = req.params.movieId;

  console.log("movieId param: ", movieId);

  const movie = await Movie.findBy("api_id", movieId);
  if (!movie) {
    res.status(404).send({
      err: "Found no movie by that id",
    });
  } else {
    res.status(200).send({
      message: "Movie found",
      movie: movie,
    });
  }
};

exports.update = async (req, res) => {
  //update a movie
  const movieId = req.params.movieId;
  const query = req.body; // these are what we are updating
  let fields = {};
  for (let field in query) {
    fields[field] = query[field];
  }
  const result = await Movie.update(movieId, fields);
  if (!result) {
    res.status(500).send({
      err: "Update unsuccessful",
    });
  } else res.status(200).send({ message: "Movie updated successfully." });
};
