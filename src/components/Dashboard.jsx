import React, { useEffect, useState } from "react";
import { FaUsers, FaCheckCircle, FaBuilding } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [employees, getEmployees] = useState([]);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("https://render.com/docs/web-services#port-binding/api/admin/logout", null, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      alert("Logout failed");
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      fetch("https://render.com/docs/web-services#port-binding//api/employees/all")
        .then((response) => response.json())
        .then((data) => getEmployees(data))
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("Failed to fetch employee data.");
        });
    };
    const fetchRecent = async () => {
      try {
        const res = await axios.get("https://render.com/docs/web-services#port-binding/api/employees/recent");
        setRecentEmployees(res.data);
      } catch (err) {
        console.error("Error fetching recent employees", err);
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await axios.get("https://render.com/docs/web-services#port-binding/api/departments/all", {
          withCredentials: true,
        });
        setDepartments(res.data);
      } catch (err) {
        console.error("Error fetching departments", err);
      }
    };

    fetchEmployee();
    fetchRecent();
    fetchDepartments();
  }, []);

  return (
    <Layout>
      <h2>Dashboard Overview</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <FaUsers size={30} className="text-primary mb-2" />
              <h5>Total Employees</h5>
              <h3>{Array.isArray(employees) ? employees.length : "Loading..."}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <FaCheckCircle size={30} className="text-success mb-2" />
              <h5>Active Employees</h5>
              <h3>{Array.isArray(employees) ? employees.length : "Loading..."}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <FaBuilding size={30} className="text-warning mb-2" />
              <h5>Departments</h5>
              <h3>{departments.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4>Recent Employees</h4>
        <table className="table table-hover mt-3">
          <thead className="table-light text-center">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {recentEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.fname}</td>
                <td>{emp.email}</td>
                <td>{emp.mobile}</td>
                <td>{emp.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Dashboard;
