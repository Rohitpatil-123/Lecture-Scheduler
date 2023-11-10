import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo">Online lecture scheduling system</div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/instructors" className="nav-link">
              Instructors
            </Link>
          </li>
          <li>
            <Link to="/add-course" className="nav-link">
              Add Course
            </Link>
          </li>
          <li>
            <Link to="/assign-lecture" className="nav-link">
              Assign Lecture
            </Link>
          </li>
          <li>
            <Link to="/lectures" className="nav-link">
              Scheduled Lectures
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
