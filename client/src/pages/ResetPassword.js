import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "../styles/ResetPassword.css";

function ResetPassword() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      newPassword: "",
      confirmPassword: "",
    });

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE RESET
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.put(
        "http://localhost:5000/api/auth/reset-password",
        formData
      );

      alert(res.data.message);

      navigate("/auth");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Reset Failed"
      );
    }
  };

  return (
    <div className="reset-container">

      <div className="reset-card">

        <h1>
          Reset Password
        </h1>

        <form
          className="reset-form"
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">
            Reset Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResetPassword;