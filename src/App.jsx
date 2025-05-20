import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Departments from "./components/Department";
import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import Dashboard from "./components/Dashboard";
import Logout  from "./components/Logout";
import AttendanceLeave from "./components/AttendanceLeave";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/attendance" element={<AttendanceLeave/>}/>
        <Route path="/performance" element={<Performance/>}/>_
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
