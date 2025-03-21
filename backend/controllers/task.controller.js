const { default: mongoose } = require("mongoose");
const httpStatus = require("http-status-codes");
const { Tasks } = require("../models/task.model");
const { Apointments } = require("../models/apointment.model");

//--------GET ALL TASKS
const getAllTasks = async (req, res) => {
  console.log("Get all tasks");
  try {
    const tasks = await Tasks.find()
      .populate("apointment")
      .populate("assignedTo");
    return res.status(httpStatus.OK).json(tasks);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

//----------GET TASK BY ID
const getTaskbyId = async (req, res) => {
  const { id } = req.params;
  console.log("Get task by id ", id);
  try {
    const task = await Tasks.findById({ _id: id })
      .populate("apointment")
      .populate("assignedTo");
    if (!task) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Task not found" });
    }
    return res.status(httpStatus.OK).json(task);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

//-------GET TASK OF MECHANICIEN
const getTaskMechanicien = async (req, res) => {
  const { id } = req.params;
  console.log("Get task mechanicien with id:", id);
  try {
    const myTasks = await Tasks.find({ assignedTo: id }).populate("apointment");
    return res.status(httpStatus.OK).json(myTasks);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

//-------SET/UPDATE TASK STATUS--------
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log("Update task status:", id, status);

  try {
    const updatedTask = await Tasks.findByIdAndUpdate(
      { _id: id },
      { $set: { status: status.toUpperCase() } },
      { new: true }
    );
    if (status.toUpperCase() === "TERMINER") {
      const doneApointment = await Apointments.findOneAndUpdate(
        { _id: updatedTask.apointment },
        { $set: { status: "DONE" } },
        { new: true }
      );
    }
    return res.status(httpStatus.OK).json(updatedTask);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskbyId,
  getTaskMechanicien,
  updateTaskStatus,
};
