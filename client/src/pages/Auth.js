import bgImage from "../assets/background.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "../styles/Auth.css";

function Auth() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] =
    useState(true);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // LOGIN
      if (isLogin) {

        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        console.log(res.data);

       localStorage.removeItem("token");

localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "userId",
  res.data.user._id
);  
        alert("Login Successful");

        navigate("/home");

      }

      // REGISTER
      else {

        await axios.post(
          "http://localhost:5000/api/auth/register",
          formData
        );

        alert("Registration Successful");

        setIsLogin(true);
      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something Went Wrong"
      );
    }
  };

  return (
   <div
  className="auth-container"
  style={{
    backgroundImage: `url(${bgImage})`,
  }}
>
    <div className="auth-heading">

  <h1>
    Campus Skill Exchange Platform
  </h1>

  <p>
    Connect • Learn • Grow
  </p>

</div>

      <div className="auth-card">

        <h1>
          {isLogin ? "Login" : "Register"}
        </h1>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {!isLogin && (

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
            />

          )}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          {isLogin && (

            <Link
  to="/reset-password"
  className="forgot-password"
>
  Forgot Password?
</Link>
          )}

          <button type="submit">

            {isLogin
              ? "Login"
              : "Register"}

          </button>

        </form>

        <p className="toggle-text">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          {" "}

          <span
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >

            {isLogin
              ? "Register"
              : "Login"}

          </span>

        </p>

      </div>

    </div>
  );
}

export default Auth;