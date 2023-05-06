const User = require("../modals/Users");
const asyncWrapper = require("../middleware/asyncWrapper");
const { customErrorFunc } = require("../errors/customError");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const _validator = require("../validator/user.validator");

//signup
//edit
//delete
//edit password

const addUser = asyncWrapper(async (req, res, next) => {
  const { error } = await _validator.signup.validate(req.body);

  if (error)
    return next(customErrorFunc(`Incorrect input format ${error}`, 400));

  req.body.password = crypto
    .createHmac("sha256", process.env.SALT)
    .update(req.body.password)
    .digest("hex");

  const user = await User.create(req.body);

  const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SALT, {
    expiresIn: "30d",
  });

  return user
    ? res.status(201).json({ msg: "Success", data: { user, token: jwtToken } })
    : res.status(400).json({ msg: "Error in adding new user" });
});

const editUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  return user
    ? res.status(200).json({ msg: "Success", data: user })
    : res.status(400).json({ msg: "Error in editing your data" });
});

const editUserByAdmin = asyncWrapper(async (req, res, next) => {
  if (!req.query.userId)
    return next(customErrorFunc("No user Id Found to update", 400));

  const user = await User.findByIdAndUpdate(req.query.userId, req.body, {
    new: true,
  });

  return user
    ? res.status(200).json({ msg: "Success", data: user })
    : res.status(400).json({ msg: "Error in editing users data" });
});

const editPassword = asyncWrapper(async (req, res, next) => {
  const password = crypto
    .createHmac("sha256", process.env.SALT)
    .update(req.body.newPassword)
    .digest("hex");

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { password },
    { new: true }
  );

  return user
    ? res.status(202).json({ msg: "Success" })
    : res.status(400).json({ msg: "Error in editing your data" });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, { isDeleted: true });

  return user
    ? res.status(202).json({ msg: "Success" })
    : res.status(400).json({ msg: "Error in editing your data" });
});

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({ isDeleted: false });

  return users
    ? res.status(202).json({ msg: "Success" })
    : res.status(400).json({ msg: "Error in editing your data" });
});

module.exports = {
  addUser,
  editUser,
  editUserByAdmin,
  editPassword,
  deleteUser,
  getAllUsers,
};
