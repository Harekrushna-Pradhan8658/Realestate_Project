const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  postOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  ownUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  isLike: {
    type: String,
    enum: {
      values: ["yes", "no"],
      message: `{VALUE} is not valid`,
    },
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Like", likeSchema);
