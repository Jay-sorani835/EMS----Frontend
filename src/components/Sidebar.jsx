import React from "react";
import { FaUserTie, FaList, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h3 className="mb-4">EMS Dashboard</h3>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a href="/employees" className="nav-link text-white">
            <FaUserTie className="me-2" /> Employees
          </a>
        </li>
        <li className="nav-item mb-2">
          <a href="/departments" className="nav-link text-white">
            <FaList className="me-2" /> Departments
          </a>
        </li>
        <li className="nav-item">
          <a href="/logout" className="nav-link text-white">
            <FaSignOutAlt className="me-2" /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
