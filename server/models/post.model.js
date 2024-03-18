const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Post = function (post) {
  this.id = post.id;
  this.content = post.content;
};

Post.create = async (newPost, userId, result) => {
  try {
    // primsa query here
    console.log("newPost: ", newPost);
    const postRes = await prisma.post.create({ data: newPost });
    console.log("created post");
    console.log("postRes: ", postRes);

    // connect the post
    const connectRes = await prisma.user.update({
      where: {
        id: newPost.userId,
      },
      data: {
        posts: {
          connect: {
            id: postRes.id,
          },
        },
      },
      include: {
        posts: true,
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
Post.update = async (user, fields) => {
  try {
    // primsa query here
    console.log("updated post");
    return true;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};
Post.findBy = async (paramName, paramVal) => {
  try {
    // primsa query here
    return result;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};
Post.getAll = async () => {
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
Post.getAllUserPosts = async (userId) => {
  try {
    console.log("userId: ", userId);
    const allUserPosts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
    });

    return allUserPosts;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
Post.del = async (postId) => {
  try {
    // primsa query here
    console.log("Post to delete: ", postId);
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return { result: "Post deleted successfully" };
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    return { err: err };
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = Post;
