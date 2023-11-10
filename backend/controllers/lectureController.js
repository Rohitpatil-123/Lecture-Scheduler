const Lecture = require("../models/lecture");
const Instructor = require("../models/instructor");

exports.assignLecture = async (req, res) => {
  try {
    const { instructor, date, courseId, batch } = req.body;

    const existingInstructor = await Instructor.findById(instructor);
    if (!existingInstructor) {
      return res.status(400).json({ error: "Instructor not found" });
    }

    const existingLecture = await Lecture.findOne({
      $and: [{ instructor }, { date }],
    });
    const existingLecture2 = await Lecture.findOne({
      $and: [{ courseId }, { batch }, { date }],
    });
    if (existingLecture || existingLecture2) {
      return res.status(201).json({
        error: "Instructor is already assigned a lecture on the same date",
      });
    }

    const newLecture = new Lecture({
      instructor,
      date,
      courseId,
      batch,
    });

    await newLecture.save();
    res.json({ message: "Lecture assigned successfully" });
  } catch (error) {
    console.error("Error assigning lecture:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate("instructor")
      .populate("courseId");
    res.json(lectures);
  } catch (error) {
    console.error("Error fetching lectures:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
