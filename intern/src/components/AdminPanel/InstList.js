import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Incs.css";

function InstructorsList() {
  const [instructors, setInstructors] = useState([]);
  const getinst = async () => {
    await axios
      .get("http://localhost:3001/api/instructors")
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  };
  useEffect(() => {
    getinst();
  }, []);

  return (
    <div className="available-instructors">
      <h2>Available Instructors</h2>
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor._id} className="instructor-item">
            <div className="instructor-info">
              <div>
                <strong>Name:</strong> {instructor.name}
              </div>
              <div>
                <strong>Subject:</strong> {instructor.Subject}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InstructorsList;
