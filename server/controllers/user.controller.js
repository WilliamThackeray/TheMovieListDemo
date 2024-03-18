const User = require("../models/user.model.js");
const util = require("./controller.util.js");

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

exports.createOne = async (req, res) => {
  const user = req.body.user;
  console.log(user);

  let validUsername = false;
  let validEmail = false;

  // re-validate user information
  validUsername = util.utils.validateUsername(user.username);
  let usernameTest = await User.findBy("username", user.username);
  if (usernameTest) {
    validUsername = false; // username is already in the DB
    res.status(500).send({
      err: "error",
      message: "That username is already in use.",
    });
    return;
  }

  validEmail = util.utils.validateEmail(user.email);
  let emailTest = await User.findBy("email", user.email);
  if (emailTest) {
    validEmail = false; // email is already in the DB
    res.text = "That email is already connected to an account.";
    res.status(500).send({
      err: "error",
      message: "That email is already connected to an account.",
    });
  }

  // if all are validated, then we are good to go.
  userIsValid = validUsername && validEmail;

  // if user is valid,
  if (userIsValid) {
    //    encrypt password
    //    add to the database
    const data = {
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      createdDate: new Date(),
    };
    let createResult = await User.create({
      data,
    });
    if (!createResult) {
      res.status(500).send({
        err: "error",
        message: "Some error occurred while creating the user",
      });
    } else {
      res.status(200).send({
        message: "User created successfully",
      });
    }
  }

  console.log("userIsValid: ", userIsValid);
};

exports.findOne = async (req, res) => {
  const username = req.params.username;
  console.log("username param: ", username);
  const user = await User.findBy("username", username);
  if (!user) {
    res.status(404).send({
      err: "Found no user by that username",
    });
  } else {
    res.status(200).send({
      message: "Login successful",
      user: user,
    });
  }
};

exports.update = async (req, res) => {
  // update a user
  const userId = req.params.userId;
  const query = req.query; // these are what we are updating
  let fields = {};
  for (let field in query) {
    fields[field] = query[field];
  }
  console.log("fields: ", fields);
  const result = await User.update(userId, fields);
  if (!result) {
    res.status(500).send({
      err: "Update unsuccessful",
    });
  } else res.status(200).send({ message: "User updated successfully." });
};

exports.findAll = async (req, res) => {
  const users = await User.getAll();
  if (!users) {
    res.status(500).send({
      message: "Some error occurred while retrieving users.",
    });
  } else res.status(200).send(users);
};

exports.deleteOne = async (req, res) => {
  // delete a user
  const username = req.params.username;
  const user = await User.findBy("username", username);
  console.log("user: ", user);
  const result = await User.del(user);
  if (!result) {
    res.status(500).send({
      err: "Delete unsuccessful",
    });
  } else res.status(200).send({ message: "User deleted successfully." });
};
