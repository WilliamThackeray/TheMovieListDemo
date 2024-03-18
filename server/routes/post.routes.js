module.exports = (app) => {
  const post = require("../controllers/post.controller.js");

  var router = require("express").Router();

  // create a new post
  app.post("/api/post", post.createOne);

  // get all posts for one user
  app.get("/api/post/:userId", post.findAllUserPosts);

  // put a change for a post
  app.put("/api/post/:postId", post.update);

  // get all post
  app.get("/api/post", post.findAll);

  // delete one post
  app.delete("/api/post/:postId", post.deleteOne);

  app.use("/api/post", router);
};
