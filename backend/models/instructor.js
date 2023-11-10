const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Subject: {
    type: String,
    required: true,
  },
});

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
