import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LectureList from "./components/InstructorPanel/LectureList.js";
import AddCourseForm from "./components/AdminPanel/AdCF.js";
import AssignLectureForm from "./components/AdminPanel/AcL.js";
import InstructorsList from "./components/AdminPanel/InstList.js";
import Home from "./components/home.js";
import Navbar from "./components/Navbar.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/instructors" element={<InstructorsList />} />
        <Route path="/lectures" element={<LectureList />} />
        <Route path="/add-course" element={<AddCourseForm />} />
        <Route path="/assign-lecture" element={<AssignLectureForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
