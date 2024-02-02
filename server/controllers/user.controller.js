const User = require("../models/user.model.js");

// const { body, validationResult } = require("express-validator");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.findAll = async (req, res) => {
  // const users = await prisma.user.findMany({});
  const users = await User.getAll();
  if (!users) {
    res.status(500).send({
      message: "Some error occurred while retrieving users.",
    });
  } else res.status(200).send(users);
};
