import React, { useState } from "react";
import "./login1.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function EmployeeList() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { email, password } = formData;

      try {
        const res = await axios.post(
          "https://render.com/docs/web-services#port-binding/api/admin/login",
          {
            email,
            password,
          }
        );
        if (res.status === 200) {
          alert("Login successful");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Axios error:", error);

        if (error.response) {
          // The request was made and the server responded with a status code not in 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);

          if (error.response.status === 401) {
            alert("Incorrect password");
          } else if (error.response.status === 404) {
            alert("User not with found");
          } else {
            alert("Login failed: " + error.response.data);
          }
        } else if (error.request) {
          // The request was made but no response received
          console.error("No response received:", error.request);
          alert("Server is not responding. Check backend is running.");
        } else {
          // Something else happened in setting up the request
          console.error("Axios setup error:", error.message);
          alert("Login error: " + error.message);
        }
      }
    }
  };

  return (
    <div className="form-bg">
      <div className="form-container shadow-lg">
        <h2 className="form-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label className="details">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label className="details">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-animated-register btn-lg">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeList;
