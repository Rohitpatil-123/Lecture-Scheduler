const express = require("express");
const mongoose = require("mongoose");
const instructorController = require("./controllers/instructorController");
const lectureController = require("./controllers/lectureController");
const courseController = require("./controllers/courseController");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors()
  //     {
  //     origin: ["*"],
  //     methods: ["GET", "PUT", "POST", "DELETE"],
  //     credentials: true,
  //   }
);

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://rohit:rohit@intern.v12fwko.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.get("/api/instructors", instructorController.getAllInstructors);
app.post("/api/addlecture", lectureController.assignLecture);
app.post("/api/addinstructors", instructorController.addInstructor);
app.post("/api/addcourses", courseController.addCourse);
app.get("/api/courses", courseController.getAllCourses);
app.get("/api/lectures", lectureController.getAllLectures);
app.get("/api/course/:id", courseController.getCourse);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
