import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AcL.css";
import { format } from "date-fns";

function AssignLectureForm() {
  const [lectureData, setLectureData] = useState({
    instructor: "",
    date: "",
    courseId: "",
    batch: "",
  });
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const today = new Date();
  const formattedToday = format(today, "yyyy-MM-dd");

  const getinst = async () => {
    const response = await fetch("http://localhost:3001/api/instructors");
    const data = await response.json();
    setInstructors(data);
  };
  const getcourses = async () => {
    const response = await fetch("http://localhost:3001/api/courses");
    const data = await response.json();
    setCourses(data);
  };

  useEffect(() => {
    getinst();
    getcourses();
  }, []);

  const handleSubjectChange = async (courseId) => {
    // Fetch batches based on the selected subject (courseId)
    const response = await axios.get(
      `http://localhost:3001/api/course/${courseId}`
    );
    setBatches(response.data);
  };

  const handleAssignLecture = async () => {
    const res = await axios.post(
      "http://localhost:3001/api/addlecture",
      lectureData
    );
    if (res.status === 200) {
      setLectureData({
        instructor: "",
        date: "",
        courseId: "",
        batch: "",
      });
      alert("Lecture Assigned Successfully");
    }
    if (res.status === 201) {
      setLectureData({
        instructor: "",
        date: "",
        courseId: "",
        batch: "",
      });
      alert("Lecture Already Assigned");
    }
  };

  return (
    <div className="assign-lecture-form">
      <h2>Assign Lecture</h2>
      <form>
        <div className="form-group">
          <label>Instructor:</label>
          <select
            value={lectureData.instructor}
            onChange={(e) => {
              setLectureData({ ...lectureData, instructor: e.target.value });
            }}
          >
            <option value="">Select an Instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor._id} value={instructor._id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={lectureData.date}
            min={formattedToday}
            onChange={(e) =>
              setLectureData({ ...lectureData, date: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Course:</label>
          <select
            value={lectureData.courseId}
            onChange={(e) => {
              setLectureData({
                ...lectureData,
                courseId: e.target.value,
                batch: "", // Reset batch when the subject changes
              });
              handleSubjectChange(e.target.value);
            }}
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Batch:</label>
          <select
            value={lectureData.batch}
            onChange={(e) =>
              setLectureData({ ...lectureData, batch: e.target.value })
            }
          >
            <option value="">Select a Batch</option>
            {batches.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="asbut" onClick={handleAssignLecture}>
          Assign Lecture
        </button>
      </form>
    </div>
  );
}

export default AssignLectureForm;
