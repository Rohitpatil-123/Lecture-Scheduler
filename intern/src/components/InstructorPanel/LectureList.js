import React, { useState, useEffect } from "react";
import "./LectureList.css";
import axios from "axios";

const LectureList = () => {
  const [lectures, setLectures] = useState([]);
  const fetchlectures = async () => {
    const response = await axios.get("http://localhost:3001/api/lectures");
    setLectures(response.data);
  };
  useEffect(() => {
    fetchlectures();
  }, []);
  return (
    <div className="lecture-list">
      <h2>Assigned Lecture List</h2>
      <ul>
        {lectures.map((lecture) => (
          <li key={lecture._id} className="lecture-item">
            <div className="lecture-info">
              <div>
                <strong>Date:</strong>{" "}
                {new Date(lecture.date).toLocaleDateString()}
              </div>
              <div>
                <strong>Instructor:</strong> {lecture.instructor.name}
              </div>
              <div>
                <strong>Subject:</strong> {lecture.instructor.Subject}
              </div>
              <div>
                <strong>Course Name:</strong> {lecture.courseId.name}
              </div>
              <div>
                <strong>Course Level:</strong> {lecture.courseId.level}
              </div>
              <div>
                <strong>Description:</strong> {lecture.courseId.description}
              </div>
              <div>
                <strong>Batch:</strong> {lecture.batch}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LectureList;
