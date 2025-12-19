const mongoose = require("mongoose");
const validator = require("validator");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    title: {
      type: String,
    },
    Price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    bedroom: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    lattitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ["buy", "rent"],
        message: `{VALUE} is incorrect status type`,
      },
    },
    size: {
      type: Number,
    },
    incomePolicy: {
      type: String,
    },
    property: {
      type: String,
      required: true,
      enum: ["apartment", "house", "condo", "land"],
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    petPolicy: {
      type: String,
    },
    utilityPolicy: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
