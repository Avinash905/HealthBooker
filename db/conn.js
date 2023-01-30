const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

const mongodbconn = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {})
  .catch((error) => {
    return error;
  });

module.exports = mongodbconn;
