const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Movie = function (movie) {
  this.id = movie.id;
};

Movie.create = async (newMovie) => {
  try {
    console.log("newMovie: ", newMovie);
    let movie = await prisma.movie.create(newMovie);
    console.log("created movie");
    return movie;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

Movie.findBy = async (paramName, paramVal) => {
  try {
    const result = await prisma.movie.findFirst({
      where: {
        [paramName]: paramVal,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

Movie.update = async (movieId, fields) => {
  try {
    await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: fields,
    });
    console.log("updated movie");
    return true;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = Movie;
