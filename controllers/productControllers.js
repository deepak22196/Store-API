const product = require("../models/productSchema");
const asyncWrapper = require("../utils/asyncWrapper");
const createCustomError = require("../utils/customApiError");

const getAllProducts = async (req, res) => {
  try {
    const allTasks = await task.find({});
    res.status(200).json({ tasks: allTasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const taskid = req.params.id;
    const singleTask = await task.findOne({ _id: taskid });
    if (!singleTask) {
      return next(createCustomError("no task with given id", 404));
      return res.status(404).json({ msg: "no task with given id" });
    }
    res.status(200).json({ task: singleTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const addProducts = asyncWrapper(async (req, res) => {
  const newproduct = await product.create(req.body);
  res.status(201).json({ newproduct });
});
const updateProduct = async (req, res) => {
  try {
    const taskid = req.params.id;
    const singleTask = await task.findOneAndUpdate({ _id: taskid }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!singleTask) {
      return res.status(404).json({ msg: "no task with given id" });
    }
    res.status(200).json({ task: singleTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const taskid = req.params.id;
    const singleTask = await task.findOneAndDelete({ _id: taskid });
    if (!singleTask) {
      return res.status(404).json({ msg: "no task with given id" });
    }
    res.status(200).json({ task: singleTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllProducts,
  addProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
};
