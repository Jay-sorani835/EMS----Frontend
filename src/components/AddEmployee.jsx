import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function AddEmployee() {
  const navigate = useNavigate();
  const [department, setDepartments] = useState([]);

  const [employee, setEmployee] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };
//add new employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/employees/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert("Employee added successfully!");
        navigate("/employees");
      } else {
        alert("Failed to add employee.");
      }
    } catch (error) {
      console.error("Add error:", error);
      alert("Error adding employee.");
    }
  };

  //fetch all department
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/departments/all", {
      });
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments", err);
    }
  };
  useEffect(() => {
    fetchDepartments();
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Employee</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            name="fname"
            value={employee.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            name="lname"
            value={employee.lname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            name="mobile"
            value={employee.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {department.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            name="gender"
            value={employee.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={employee.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
