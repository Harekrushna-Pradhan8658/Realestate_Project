const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Post = require("../models/post");
const postRouter = express.Router();

postRouter.post("/addpost", userAuth, async (req, res) => {
  try {
    const id = req.user._id;
    // console.log(req.user);

    const {
      title,
      Price,
      images,
      address,
      city,
      bedroom,
      bathroom,
      lattitude,
      longitude,
      type,
      size,
      incomePolicy,
      property,
      utilityPolicy,
      phoneNo,
      petPolicy,
      description,
    } = req.body;

    const userPost = new Post({
      userId: id,
      title,
      Price,
      images,
      address,
      city,
      bedroom,
      bathroom,
      lattitude,
      longitude,
      type,
      size,
      incomePolicy,
      property,
      utilityPolicy,
      phoneNo,
      petPolicy,
      description,
    });

    const data = await userPost.save();

    res.json({
      message: "post added sucessfully.",
      data,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

postRouter.delete("/delete/:postId", userAuth, async (req, res) => {
  try {
    const userid = req.user._id;
    const postId = req.params.postId;

    // find the post by Id
    const post = await Post.findById(postId);

    //if post doesen't exist
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    // check if the current user is the owner of the post
    if (!post.userId.equals(userid)) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can't delete the post" });
    }
    //delete the post
    await Post.findByIdAndDelete(postId);

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

postRouter.get(
  "/search/:address/:lowPrice/:highPrice/:type",
  userAuth,
  async (req, res) => {
    try {
      const { address, lowPrice, highPrice, type } = req.params;

      const query = {
        address: { $regex: address, $options: "i" }, // case-insensitive partial match
        Price: { $gte: parseInt(lowPrice), $lte: parseInt(highPrice) },
      };

      if (type && type.toLowerCase() !== "all") {
        query.type = type;
      }

      const posts = await Post.find(query);
      // console.log("query",query);

      if (posts.length === 0) {
        return res
          .status(404)
          .json({ message: "No posts found matching your criteria." });
      }

      res.json({
        message: `Found ${posts.length} matching post(s).`,
        data: posts,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

postRouter.get("/myposts", userAuth, async (req, res) => {
  try{
    const userId = req.user._id;

    const userPosts = await Post.find({userId: userId});

    res.json({
      message: `Found ${userPosts.length} post(s) by this user.`,
      data: userPosts,
    });

  }catch(err){
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

postRouter.get("/getallposts", userAuth, async (req, res) => {
  try{
    const posts = await Post.find({});

      if (posts.length === 0) {
        return res
          .status(404)
          .json({ message: "No posts found matching your criteria." });
      }
      res.json({
        message: `Here are your all the posts.`,
        data: posts,
      });

  }catch(err){
    res.status(500).json({message: "Something went wrong", error:err.message });
  }
})

module.exports = postRouter;
