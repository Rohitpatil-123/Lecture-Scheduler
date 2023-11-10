const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  date: { type: Date, required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
});

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
