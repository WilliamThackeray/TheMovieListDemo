const Rating = require("../models/rating.model.js");
const Util = require("./controller.util.js");

exports.createOne = async (req, res) => {
  console.log("rating | create one");
  let movieId;
  let movie;

  const body = req.body;

  console.log("body: ", body);

  // first, check if the movie is in the DB,
  await fetch(`http://localhost:8080/api/movie/${body.movieId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      movie = result.movie;
    });

  if (!movie) {
    // no movie found
    console.log("no movie found, we will create one");

    // create movieBody
    const movieBody = {
      title: body.movie,
      api_id: body.movieId,
      avg_overall: 0,
      avg_acting: 0,
      avg_attraction: 0,
      avg_cinemetography: 0,
      avg_dialogue: 0,
      avg_directing: 0,
      avg_editing: 0,
      avg_plot: 0,
      avg_soundtrack: 0,
      avg_specialEffects: 0,
      avg_theme: 0,
      createdDate: new Date(),
    };

    // create a new movie in the DB
    await fetch(`http://localhost:8080/api/movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieBody),
    })
      .then((res) => res.json())
      .then((result) => {
        movie = result.movie;
        movieId = result.movie.id;
      });
  } else {
    // movie found
    console.log("movie found, we will get the id");
    // set the movieId
    movieId = movie.id;
  }
  console.log("movie: ", movie);
  let values = Object.values(body.ratings);
  let zeros = 0;
  let sum = values.reduce((acc, val) => {
    if (val === 0) {
      zeros++;
    }
    return acc + val;
  }, 0);
  let average = sum / (values.length - zeros);
  console.log("rating avg: ", average);
  // create the rating and add to the DB
  data = {
    movieId: movieId,
    movie_title: movie.title,
    userId: body.user,
    average: average,
    acting: body.ratings.acting,
    attraction: body.ratings.attraction,
    cinemetography: body.ratings.cinemetography,
    dialogue: body.ratings.dialogue,
    directing: body.ratings.directing,
    editing: body.ratings.editing,
    plot: body.ratings.plot,
    soundtrack: body.ratings.soundtrack,
    specialEffects: body.ratings.specialEffects,
    theme: body.ratings.theme,
    personalScore: body.personalScore,
    review: body.review,
    tot_stars: 0,
    createdDate: new Date(),
  };
  let ratingResult = await Rating.create({ data });
  console.log("new rating: ", ratingResult);

  // get all ratings for a single movie
  let movieRatings;

  await fetch(`http://localhost:8080/api/rating/movie?id=${movieId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      movieRatings = result.result;
    });

  console.log("movieRatings: ", movieRatings);

  let data = Util.utils.getAverage(movieRatings);

  // let tot_acting = 0;
  // let tot_attraction = 0;
  // let tot_cinemetography = 0;
  // let tot_dialogue = 0;
  // let tot_directing = 0;
  // let tot_editing = 0;
  // let tot_plot = 0;
  // let tot_soundtrack = 0;
  // let tot_specialEffects = 0;
  // let tot_theme = 0;

  // let tot_ratings = movieRatings.length;

  // for (let rating of movieRatings) {
  //   tot_acting += rating.acting;
  //   tot_attraction += rating.attraction;
  //   tot_cinemetography += rating.cinemetography;
  //   tot_dialogue += rating.dialogue;
  //   tot_directing += rating.directing;
  //   tot_editing += rating.editing;
  //   tot_plot += rating.plot;
  //   tot_soundtrack += rating.soundtrack;
  //   tot_specialEffects += rating.specialEffects;
  //   tot_theme += rating.theme;
  // }

  // // get the rating id to connect to the movie in the DB
  // // update the movie with the rating contents
  // let avg_acting = tot_acting / tot_ratings;
  // let avg_attraction = tot_attraction / tot_ratings;
  // let avg_cinemetography = tot_cinemetography / tot_ratings;
  // let avg_dialogue = tot_dialogue / tot_ratings;
  // let avg_directing = tot_directing / tot_ratings;
  // let avg_editing = tot_editing / tot_ratings;
  // let avg_plot = tot_plot / tot_ratings;
  // let avg_soundtrack = tot_soundtrack / tot_ratings;
  // let avg_specialEffects = tot_specialEffects / tot_ratings;
  // let avg_theme = tot_theme / tot_ratings;

  // // total of the averages
  // const totalAvgs =
  //   avg_acting +
  //   avg_attraction +
  //   avg_cinemetography +
  //   avg_dialogue +
  //   avg_directing +
  //   avg_editing +
  //   avg_plot +
  //   avg_soundtrack +
  //   avg_specialEffects +
  //   avg_theme;

  // let averages = [
  //   avg_acting,
  //   avg_attraction,
  //   avg_cinemetography,
  //   avg_dialogue,
  //   avg_directing,
  //   avg_editing,
  //   avg_plot,
  //   avg_soundtrack,
  //   avg_specialEffects,
  //   avg_theme,
  // ];

  // // get rid of 0's
  // console.log("averages: ", averages);
  // for (let average of averages) {
  //   if (average == 0) averages.splice(averages.indexOf(average), 1);
  // }
  // console.log("averages: ", averages);

  // data = {
  //   avg_overall: averages.length == 0 ? 0 : averages.length,
  //   avg_acting: avg_acting,
  //   avg_attraction: avg_attraction,
  //   avg_cinemetography: avg_cinemetography,
  //   avg_dialogue: avg_dialogue,
  //   avg_directing: avg_directing,
  //   avg_editing: avg_editing,
  //   avg_plot: avg_plot,
  //   avg_soundtrack: avg_soundtrack,
  //   avg_specialEffects: avg_specialEffects,
  //   avg_theme: avg_theme,
  // };
  await fetch(`http://localhost:8080/api/movie/${movieId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("updated movie: ", result);
    });

  res.status(200).send({ message: "Rating created successfully." });
};

exports.update = async (req, res) => {
  // update a rating
};

exports.findAllRatingsFor = async (req, res) => {
  const ratingType = req.params.ratingType;
  let result;

  if (ratingType == "movie") {
    result = await Rating.getAllRatings("movieId", req.query.id);
  }
  if (ratingType == "user") {
    result = await Rating.getAllRatings("userId", req.query.id);
  }
  console.log(`get all ratings connected to '${ratingType}'`);

  res.status(200).send({ result: result });
};

exports.deleteOne = async (req, res) => {
  const ratingId = req.params.ratingId;
  const movieId = req.query.movieId;

  console.log("ratingId: ", ratingId);

  const result = await Rating.del(ratingId);

  let movieRatings;

  await fetch(`http://localhost:8080/api/rating/movie?id=${movieId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      movieRatings = result.result;
    });

  console.log("movieRatings: ", movieRatings);

  let data = Util.utils.getAverage(movieRatings);

  await fetch(`http://localhost:8080/api/movie/${movieId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("updated movie: ", result);
    });

  if (result.err) res.status(500).send(result);

  res.status(200).send(result);
};
