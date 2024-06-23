const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

const getComment = async (req, res) => {
  const { id } = req.params;
  try {
    let blog = await Blog.findById(id).populate("comments");
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Comments fetched sucessfully",
      comments: blog.comments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment, userName, userImage, userId } = req.body;
  try {
    let blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    let newComment = await Comment.create({
      comment,
      userName,
      userImage,
      userId,
      postId: id,
    });

    blog.comments.push(newComment);
    await blog.save();
    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { comment } = req.body;
  try {
    let commentToUpdate = await Comment.findById(commentId);
    if (!commentToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    if (commentToUpdate.postId.toString() !== blogId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment for this blog" });
    }
    commentToUpdate.comment = comment;
    await commentToUpdate.save();
    return res
      .status(200)
      .json({ success: true, message: "Comment updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  try {
    let commentToDelete = await Comment.findById(commentId);
    if (!commentToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    if (commentToDelete.postId.toString() !== blogId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment for this blog" });
    }
    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    blog.comments.pull(commentId);
    await blog.save();
    await commentToDelete.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getComment, addComment, updateComment, deleteComment };
