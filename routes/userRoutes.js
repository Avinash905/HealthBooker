const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get("/getcurrentuser", auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.locals }).select("-password");
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
});

userRouter.get("/getuser/:id", auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }).select(
      "-password"
    );
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
});

userRouter.get("/getallusers", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.send(users);
  } catch (error) {
    res.status(500).send("Unable to get users");
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (!emailPresent) {
      return res.status(400).send("Incorrect credentials");
    }
    const verifyPass = await bcrypt.compare(
      req.body.password,
      emailPresent.password
    );
    if (!verifyPass) {
      return res.status(400).send("Incorrect credentials");
    }
    const token = jwt.sign(
      { userId: emailPresent._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );
    return res.status(201).send({ msg: "User logged in successfully", token });
  } catch (error) {
    res.status(500).send("Unable to login user");
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (emailPresent) {
      return res.status(400).send("Email already exists");
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = await User({ ...req.body, password: hashedPass });
    const result = await user.save();
    if (!result) {
      return res.status(500).send("Unable to register user");
    }
    return res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Unable to register user");
  }
});

userRouter.put("/updateprofile", auth, async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const result = await User.findByIdAndUpdate(
      { _id: req.locals },
      { ...req.body, password: hashedPass }
    );
    if (!result) {
      return res.status(500).send("Unable to update user");
    }
    return res.status(201).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Unable to update user");
  }
});

userRouter.delete("/deleteuser", auth, async (req, res) => {
  try {
    const result = await User.findByIdAndDelete({ _id: req.body.userId });
    return res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Unable to delete user");
  }
});

module.exports = userRouter;
