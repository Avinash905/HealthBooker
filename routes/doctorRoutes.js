const express = require("express");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

const doctorRouter = express.Router();

doctorRouter.get("/getAlldoctors", auth, async (req, res) => {
  try {
    const user = await User.find({ isDoctor: true });
    const arr = [];
    for (let index = 0; index < user.length; index++) {
      const details = await Doctor.findOne({ userId: user[index]._id }).select(
        "-password"
      );
      arr.push(details);
    }
    return res.send(arr);
  } catch (error) {
    res.status(500).send("Unable to get doctors");
  }
});

doctorRouter.post("/applyfordoctor", auth, async (req, res) => {
  try {
    const alreadyFound = await Doctor.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }

    const user = await User.findOne({ _id: req.locals });
    const admin = await User.findOne({ isAdmin: true });
    admin.notification = admin.notification.concat(
      `Mr. ${user.firstname} ${user.lastname} has submitted an application for doctor approval,${user._id},`
    );
    await admin.save();

    const doctor = Doctor({ ...req.body, userId: req.locals });
    const result = await doctor.save();
    return res.status(201).send({ msg: "Application submitted successfully" });
  } catch (error) {
    res.status(500).send("Unable to submit application");
  }
});

doctorRouter.put("/acceptdoctor", auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: true, status: "accepted" }
    );

    const doctor = await User.findOne({ _id: req.body.id });
    doctor.notification = doctor.notification.concat(
      `Congratulations, Your doctor request application has been accepted.`
    );
    await doctor.save();

    const admin = await User.findOne({ isAdmin: true });
    for (let i = 0; i < admin.notification.length; i++) {
      if (admin.notification[i].split(",")[1] === req.body.id) {
        admin.notification[i] += "accepted";
      }
    }
    await admin.save();

    return res.status(201).send({ msg: "Application accepted" });
  } catch (error) {
    res.status(500).send("Error while accepting application");
  }
});

doctorRouter.put("/rejectdoctor", auth, async (req, res) => {
  try {
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: false, status: "rejected" }
    );
    const delDoc = await Doctor.findOneAndDelete({ userId: req.body.id });

    const doctor = await User.findOne({ _id: req.body.id });
    doctor.notification = doctor.notification.concat(
      `Sorry, Your application has been rejected.`
    );
    await doctor.save();

    const admin = await User.findOne({ isAdmin: true });
    for (let i = 0; i < admin.notification.length; i++) {
      if (admin.notification[i].split(",")[1] === req.body.id) {
        admin.notification[i] += "rejected";
      }
    }
    await admin.save();

    return res.status(201).send({ msg: "Application rejected" });
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
});

doctorRouter.put("/deleteallnotif", auth, async (req, res) => {
  try {
    const details = await User.findOne({ _id: req.body.id });

    details.notification = [];
    await details.save();

    return res.status(201).send({ msg: "All notifications deleted" });
  } catch (error) {
    res.status(500).send("Error while deleting notifications");
  }
});

module.exports = doctorRouter;
