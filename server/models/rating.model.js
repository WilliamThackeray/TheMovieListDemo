const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Rating = function (rating) {
  this.id = rating.id;
};

Rating.create = async (newRating) => {
  try {
    console.log("newRating: ", newRating);
    let rating = await prisma.rating.create(newRating);
    console.log("created rating");
    return rating;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

Rating.getAllRatings = async (type, id) => {
  try {
    console.log("id: ", id);
    const allRatings = await prisma.rating.findMany({
      where: {
        [type]: id,
      },
    });

    return allRatings;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

Rating.del = async (ratingId) => {
  try {
    console.log("Rating to delete: ", ratingId);
    await prisma.rating.delete({
      where: {
        id: ratingId,
      },
    });
    return { result: "Rating deleted successfully" };
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    return { err: err };
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = Rating;
