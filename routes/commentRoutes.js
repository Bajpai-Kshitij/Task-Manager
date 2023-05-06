const express = require("express");
const router = express.Router();

const _controller = require("../controller/comments");
const _auth = require("../auth/auth");

router.use("/", _auth.userVerifyToken);

router.route("/").get(_controller.getAllComments).post(_controller.addComment);
router
  .route("/:commentId")
  .get(_controller.getComment)
  .patch(_controller.editComment)
  .delete(_controller.deleteComment);

module.exports = router;
