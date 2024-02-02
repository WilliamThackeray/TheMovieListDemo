const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const User = function (user) {
  this.id = user.id;
  this.name = user.name;
  this.email = user.email;
};

User.create = async (newUser, result) => {
  try {
    // primsa query here

    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};
User.findById = async (newUser, result) => {
  try {
    // primsa query here

    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};
User.getAll = async () => {
  try {
    const users = await prisma.user.findMany({});
    return users;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = User;
