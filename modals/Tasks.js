const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    status: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", TaskSchema);
