const Course = require("../models/course");

exports.addCourse = async (req, res) => {
  try {
    const { name, level, description, image, batches } = req.body;

    const checkcourse = await Course.findOne({ name });
    if (checkcourse) {
      return res.status(201).json({ error: "Course already exists" });
    }

    const newCourse = new Course({
      name,
      level,
      description,
      image,
      batches,
    });

    await newCourse.save();
    res.json({ message: "Course added successfully" });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    res.json(course.batches);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
