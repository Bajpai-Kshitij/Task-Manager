const express = require("express");
const router = express.Router();

const _controller = require("../controller/posts");
const _auth = require("../auth/auth");

router.use("/", _auth.userVerifyToken);

router.route("/").get(_controller.getAllPosts).post(_controller.addPost);
router
  .route("/:postId")
  .get(_controller.getPost)
  .patch(_controller.editPost)
  .delete(_controller.deletePost);

module.exports = router;
