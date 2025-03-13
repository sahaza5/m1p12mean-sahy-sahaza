const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");

const { Repairs } = require("../models/repair.model");

//--------GET REPAIR BY ID------//
const getRepairById = async (req, res) => {
  console.log("Get all repair");
  const { id } = req.params;
  try {
    const repair = await Repairs.find({ _id: id }).populate({
      path: "apointment",
      populate: {
        path: "car",
      },
    });
    return res.status(httpStatus.OK).json(repair);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
  //   return res.status(httpStatus.OK).json("test");
};

//-------GET ALL REPAIR--------//
const getAllRepair = async (req, res) => {
  console.log("Get all repair");
  try {
    // const repairs = await Repairs.find().populate({
    //   path: "apointment",
    //   populate: {
    //     path: "car",
    //   },
    // });
    const repairs = await Repairs.find().populate({
      path: "apointment",
      populate: [
        {
          path: "car",
        },
        { path: "belongsTo", select: "username" },
      ],
    });
    return res.status(httpStatus.OK).json(repairs);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
  //   return res.status(httpStatus.OK).json("test");
};

module.exports = { getRepairById, getAllRepair };
