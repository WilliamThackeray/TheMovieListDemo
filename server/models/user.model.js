const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const User = function (user) {
  this.id = user.id;
  this.name = user.name;
  this.email = user.email;
};

User.create = async (newUser) => {
  try {
    console.log("newUser: ", newUser);
    await prisma.user.create(newUser);
    console.log("created user");
    return true;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};
User.update = async (userId, fields) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: fields,
    });
    console.log("updated user");
    return true;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};
User.findBy = async (paramName, paramVal) => {
  try {
    // primsa query here
    const result = await prisma.user.findFirst({
      where: {
        [paramName]: paramVal,
      },
    });
    console.log("user: ", result);
    return result;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};
User.getAll = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    console.log("allUsers: ", allUsers);
    return allUsers;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
User.del = async (user, result) => {
  try {
    // primsa query here
    console.log("User to delete: ", user);
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return true;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = User;
