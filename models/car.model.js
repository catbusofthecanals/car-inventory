const mongoose = require("mongoose");

// use mongoose to create a schema identifying car data
const carSchema = new mongoose.Schema({
  make: Number,
  model: String,
  owner: String,
  registration: String,
});

// export model
module.exports = mongoose.model("Car", carSchema);
