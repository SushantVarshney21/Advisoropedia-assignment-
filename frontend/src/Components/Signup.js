import React, { useState } from "react";
import "../CSS/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [formerror, setFormError] = useState({});
  const nav = useNavigate();

  const validate = (fullname, email, password) => {
    const errors = {};
    if (!fullname) {
      errors.fullname = "fullname is required";
    }
    if (!email) {
      errors.email = "email is required";
    }
    if (!password) {
      errors.password = "password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(validate(fullname, email, password));
    try {
      const response = await axios.post(
        `${props.port}/users/register`,
        { fullname, email, password }
      );
      if (response) {
        nav("/login");
        alert("Signup successfully please login");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
   <div className="main">
         <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          // required
        />
        <p className="formerror">{formerror.fullname}</p>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // required
        />
        <p className="formerror">{formerror.email}</p>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
        />
        <p className="formerror">{formerror.password}</p>
        <button type="submit">Sign Up</button>
      </form>
      <h5>
        You have already account please <Link to="/login">Login</Link>
      </h5>
    </div>
   </div>
  );
};

export default Signup;
