import React, { useState } from "react";
import "../CSS/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const nav = useNavigate();

  const logout = async () => {
    localStorage.removeItem("token");
    alert("Logout Successfully");
    nav("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">Posts.com</a>
        </div>
        <ul className={isOpen ? "navbar-menu active" : "navbar-menu"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {localStorage.getItem("token") ? (
            <button onClick={logout}>Logout</button>
          ) : null}
        </ul>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={isOpen ? "line line1 active" : "line line1"}></div>
          <div className={isOpen ? "line line2 active" : "line line2"}></div>
          <div className={isOpen ? "line line3 active" : "line line3"}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
