const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userName: String,
    userImage: String,
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    userId: String,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
