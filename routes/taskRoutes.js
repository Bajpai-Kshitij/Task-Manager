const express = require("express");
const router = express.Router();

const _controller = require("../controller/tasks");
const _auth = require("../auth/auth");

router.use("/", _auth.userVerifyToken);

router.route("/").get(_controller.getAllTasks).post(_controller.createTasks);
router
  .route("/:taskId")
  .get(_controller.getTasks)
  .patch(_controller.patchTasks)
  .delete(_controller.deleteTasks);

module.exports = router;
