const Posts = require("../modals/Posts");
const asyncWrapper = require("../middleware/asyncWrapper");
const { customErrorFunc } = require("../errors/customError");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//new post
//edit post
//delete post
//get all posts

const addPost = asyncWrapper(async (req, res, next) => {
  req.body.user = req.user._id;
  const post = await Posts.create(req.body);

  return post
    ? res.status(201).json({ msg: "Success", data: { post } })
    : res.status(400).json({ msg: "Error in adding new post" });
});

const editPost = asyncWrapper(async (req, res, next) => {
  if (!req.params.postId) return next(customErrorFunc("No post id Found", 400));
  //user is not allowed to edit any post by other user
  const post = await Posts.findOneAndUpdate(
    { _id: req.params.postId, user: req.user._id },
    req.body,
    { new: true }
  );

  return post
    ? res.status(200).json({ msg: "Success", data: { post } })
    : res.status(400).json({ msg: "Error in editing post" });
});

const deletePost = asyncWrapper(async (req, res, next) => {
  if (!req.params.postId) return next(customErrorFunc("No post id Found", 400));
  const post = await Posts.findOneAndUpdate(
    { _id: req.params.postId, user: req.user._id },
    { isDeleted: true },
    { new: true }
  );

  return post
    ? res.status(202).json({ msg: "Success", data: { post } })
    : res.status(400).json({ msg: "Error in deleting post" });
});

const getPost = asyncWrapper(async (req, res, next) => {
  if (!req.params.postId) return next(customErrorFunc("No post id Found", 400));

  const posts = await Posts.find({
    _id: req.params.postId,
    isDeleted: false,
  }).populate({
    path: "user",
    select: ["name"],
  });

  return posts
    ? res.status(202).json({ msg: "Success", data: { posts } })
    : res.status(400).json({ msg: "Error in fetching posts" });
});

const getAllPosts = asyncWrapper(async (req, res, next) => {
  const posts = await Posts.find({ isDeleted: false }).populate({
    path: "user",
    select: ["name"],
  });

  return posts
    ? res.status(202).json({ msg: "Success", data: { posts } })
    : res.status(400).json({ msg: "Error in fetching posts" });
});

module.exports = {
  addPost,
  editPost,
  deletePost,
  getAllPosts,
  getPost,
};
