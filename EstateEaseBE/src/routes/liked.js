const express = require("express");
const { userAuth } = require("../middlewares/auth");
const post = require("../models/post");
const like = require("../models/like");

const likedRouter = express.Router();

likedRouter.post("/like/:postId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    if (!postId) {
      return res.status(400).send("Post ID is required.");
    }

    const Post = await post.findById(postId);
    const postOwnerId = Post.userId;

    // check if the user not like to his post
    if (userId.equals(postOwnerId)) {
      throw new Error("You can't like your post");
    }

    // check do not like double
    const doubleLike = await like.findOne({
      postId: postId,
      ownUserId: userId,
    });
    if (doubleLike) {
      return res.status(400).json({ message: "You already liked this post!" });
    }

    const likedPost = new like({
      postId,
      postOwnerId,
      ownUserId: userId,
      isLike: "yes",
    });

    const data = await likedPost.save();

    res.json({
      message: "You liked the post",
      data,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});


likedRouter.get("/likeornot/:postId", userAuth, async (req, res) => {
  try{
    const userId = req.user._id;
    const postId = req.params.postId;
    if (!postId) {
      return res.status(400).send("Post ID is required.");
    }
    const isLike = await like.findOne({
      postId: postId,
      ownUserId: userId,
    });
    // console.log("isLike:", isLike);
    if(!isLike){
      console.log("not");
    }
    res.json({
      message: "Here are your liked post status.",
      data: isLike,
    });

  }catch(err){
    res.status(400).send("Error : " + err.message);
  }
});



likedRouter.get("/alllikedposts", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Step 1: Get all liked postIds for the user
    const liked = await like.find({ ownUserId: userId });

    const postIds = liked.map((likeItem) => likeItem.postId);

    // Step 2: Fetch the actual posts
    const posts = await post.find({ _id: { $in: postIds } });

    res.json({
      message: "Here are your all liked posts.",
      data: posts,
    });

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


module.exports = likedRouter;
