const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minLength: 3,
    },
    lastname: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    notification: [
      {
        type: String,
        default: "",
      },
    ],
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", schema);

module.exports = User;
