const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    text: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostSchema);
