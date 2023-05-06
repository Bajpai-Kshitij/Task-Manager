const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    comment: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Posts",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentsSchema);
