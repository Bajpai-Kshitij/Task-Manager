const Task = require("../modals/Tasks");
const asyncWrapper = require("../middleware/asyncWrapper");
const { customErrorFunc } = require("../errors/customError");

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id, isDeleted: false });
  return tasks
    ? res.status(200).json({ msg: "Success", data: { tasks } })
    : res.status(400).json({ msg: "Error in fetching all your tasks" });
});

const createTasks = asyncWrapper(async (req, res, next) => {
  req.body.user = req.user._id;
  const task = await Task.create(req.body);
  return task
    ? res.status(201).json({ msg: "Success", data: { task } })
    : res.status(400).json({ msg: "Error in adding new task" });
});

const getTasks = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
    user: req.user._id,
    isDeleted: false,
  });

  return task
    ? res.status(200).json({ msg: "Success", data: { task } })
    : res.status(400).json({ msg: "Error in fetching task" });
});

const deleteTasks = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, user: req.user._id },
    { isDeleted: true },
    { new: true }
  );

  return task
    ? res.status(202).json({ msg: "Success", data: { task } })
    : res.status(400).json({ msg: "Error in deleting task" });
});

const patchTasks = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, user: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  return task
    ? res.status(200).json({ msg: "Success", data: { task } })
    : res.status(400).json({ msg: "Error in deleting task" });
});

module.exports = {
  getAllTasks,
  getTasks,
  createTasks,
  patchTasks,
  deleteTasks,
};
