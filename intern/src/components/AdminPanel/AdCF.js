import React, { useState } from "react";
import "./AdcF.css";
import axios from "axios";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
    batches: [],
  });
  const [temin, setTempin] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handlebatch = () => {
    if (temin === "") {
      return;
    } else if (!formData.batches.includes(temin)) {
      setFormData({
        ...formData,
        batches: [...formData.batches, temin],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "https://lecturesch.onrender.com/api/addcourses",
      formData
    );
    if (response.status === 200) {
      setFormData({
        name: "",
        level: "",
        description: "",
        image: "",
        batches: [],
      });
      alert("Course Added Successfully");
    }
    if (response.status === 201) {
      setFormData({
        name: "",
        level: "",
        description: "",
        image: "",
        batches: [],
      });
      alert("Course Already Exists");
    }
  };

  return (
    <div className="add-course-form">
      <h2 style={{ textAlign: "center" }}>Add Course</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label>Level:</label>
        <input
          type="text"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
        />

        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <label>Add Image Url:</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <label>Batches:</label>
        <input
          type="text"
          value={temin}
          onChange={(e) => {
            setTempin(e.target.value);
          }}
        />
        <button type="button" className="adb" onClick={handlebatch}>
          Add Batch
        </button>
        {formData.batches.map((batch, index) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
              }}
              key={index}
            >
              <div>{batch}</div>
              <button
                className="smbut"
                onClick={() => {
                  const updatedBatches = formData.batches.filter(
                    (item, i) => i !== index
                  );
                  setFormData({ ...formData, batches: updatedBatches });
                }}
              >
                X
              </button>
            </div>
          );
        })}
        <button className="subbutton" onClick={handleSubmit}>
          Add Course
        </button>
      </div>
    </div>
  );
};

export default AddCourseForm;
