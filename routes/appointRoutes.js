const express = require("express");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const auth = require("../middleware/auth");

const appointRouter = express.Router();

appointRouter.get("/getallappointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().select("-password");
    return res.send(appointments);
  } catch (error) {
    res.status(500).send("Unable to get apponintments");
  }
});

appointRouter.post("/bookappointment", auth, async (req, res) => {
  try {
    const appointment = await Appointment({ ...req.body, userId: req.locals });
    const result = await appointment.save();
    return res.status(201).send({ msg: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).send("Unable to book appointment");
  }
});

appointRouter.put("/completed", auth, async (req, res) => {
  try {
    const alreadyFound = await Appointment.findOneAndUpdate(
      { _id: req.body.id },
      { status: "Completed" }
    );

    return res.status(201).send({ msg: "Appointment completed successfully" });
  } catch (error) {
    res.status(500).send("Unable to complete appointment");
  }
});

module.exports = appointRouter;
