const express = require("express");
const router = express.Router();

const _controller = require("../controller/users");
const _auth = require("../auth/auth");

router.route("/login").get(_auth.login);
router.route("/sign-up").post(_controller.addUser);
router.route("/forgot-password").get(_auth.forgotPassword);

router.use("/", _auth.userVerifyToken);

router
  .route("/")
  .get(_controller.getAllUsers)
  .patch(_controller.editUser)
  .delete(_controller.deleteUser);
router.route("/password").patch(_controller.editPassword);

router.use("/", _auth.isAdmin);

router.route("/update").patch(_controller.editUserByAdmin);

module.exports = router;
