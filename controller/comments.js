const Comments = require("../modals/Comments");
const asyncWrapper = require("../middleware/asyncWrapper");
const { customErrorFunc } = require("../errors/customError");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//new comment
//comment edit
//comment delete
//get all comments on post

const addComment = asyncWrapper(async (req, res, next) => {
  req.body.user = req.user._id;
  const comment = await Comments.create(req.body);

  return comment
    ? res.status(201).json({ msg: "Success", data: { comment } })
    : res.status(400).json({ msg: "Error in adding new post" });
});

const editComment = asyncWrapper(async (req, res, next) => {
  if (!req.params.commentId)
    return next(customErrorFunc("No Comment id Found", 400));
  //user is not allowed to edit any post by other user
  const comment = await Comments.findOneAndUpdate(
    { _id: req.params.commentId, user: req.user._id },
    req.body,
    { new: true }
  );

  return comment
    ? res.status(200).json({ msg: "Success", data: { comment } })
    : res.status(400).json({ msg: "Error in editing post" });
});

const deleteComment = asyncWrapper(async (req, res, next) => {
  if (!req.params.commentId)
    return next(customErrorFunc("No comment id Found", 400));
  const comment = await Comments.findOneAndUpdate(
    { _id: req.params.commentId, user: req.user._id },
    { isDeleted: true },
    { new: true }
  );

  return comment
    ? res.status(202).json({ msg: "Success", data: { comment } })
    : res.status(400).json({ msg: "Error in deleting comment" });
});

const getComment = asyncWrapper(async (req, res, next) => {
  const comments = await Comments.findOne({
    _id: req.params.commentId,
    isDeleted: false,
  })
    .populate({
      path: "user",
      select: ["name"],
    })
    .populate({
      path: "post",
      select: ["text"],
    });

  return comments
    ? res.status(202).json({ msg: "Success", data: { comments } })
    : res.status(400).json({ msg: "Error in fetching posts" });
});

const getAllComments = asyncWrapper(async (req, res, next) => {
  const comments = await Comments.find({
    post: req.query.postId,
    isDeleted: false,
  }).populate({
    path: "user",
    select: ["name"],
  });

  return comments
    ? res.status(202).json({ msg: "Success", data: { comments } })
    : res.status(400).json({ msg: "Error in fetching posts" });
});

module.exports = {
  addComment,
  editComment,
  deleteComment,
  getAllComments,
  getComment,
};
