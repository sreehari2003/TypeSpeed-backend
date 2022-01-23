const data = require("../models/schema");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await data.find();
    res.status(201).json({
      ok: true,
      data: users,
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
      error: "something went wrong try again later",
      problem: e,
    });
  }
};
exports.postData = async (req, res, next) => {
  try {
    const newUser = await data.create(req.body);
    res.status(201).json({
      ok: true,
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
      error: "something went wrong try again later",
      problem: e,
    });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const datas = await data.findOne({ _id: id });

    res.status(201).json({
      ok: true,
      datas,
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
    });
  }
};

exports.updateScore = async (req, res) => {
  try {
    const id = req.params.id;
    const up = await data.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      ok: true,
      data: up,
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
    });
  }
};
