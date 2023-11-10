const Instructor = require("../models/instructor");

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addInstructor = async (req, res) => {
  try {
    const { name, Subject } = req.body;

    const newLecturer = new Instructor({
      name,
      Subject,
    });

    await newLecturer.save();
    res.json({ message: "Lecturer added successfully" });
  } catch (error) {
    console.error("Error adding lecturer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
