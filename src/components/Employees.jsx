import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./login1.css";
function Employees() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ems-backend-ylc6.onrender.com/api/employees/all")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Failed to fetch employee data.");
      });
  }, []);

  //edit employee data
  const handleEdit = async (emp) => {
    const updated = prompt("Update employee name", emp.name);
    if (updated && updated !== emp.name) {
      try {
        await axios.put(`https://ems-backend-ylc6.onrender.comapi/employees/update/${emp.id}`, {
          ...emp,
          name: updated,
        });
        setEmployees(
          employees.map((e) => (e.id === emp.id ? { ...e, name: updated } : e))
        );
      } catch {
        alert("Edit failed");
      }
    }
  };

  //deleting data
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `https://ems-backend-ylc6.onrender.com/api/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        alert("Employee deleted successfully!");
      } else {
        alert("Failed to delete employee.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting employee.");
    }
  };

  return (
    <>
      <div className="employee-container mt-4 p-5">
        <button
          className="xor-animated-button"
          type="button"
          onClick={() => navigate("/add-employee")}
        >
          <span className="symbol">+</span>
          <span className="text">Add Employee</span>
        </button>

        <h2 className="text-center">Registered Employees</h2>
        <table className="table table-bordered table-striped mt-5">
          <thead className="thead-dark">
            <tr className="text-center">
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Password</th>
              <th>Department</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td className="text-danger">{emp.id}</td>
                <td>{emp.fname}</td>
                <td>{emp.lname}</td>
                <td>{emp.email}</td>
                <td>{emp.mobile}</td>
                <td>{emp.gender}</td>
                <td>{emp.password}</td>
                <td>{emp.department}</td>
                <td className="d-flex">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(emp)}
                    className="me-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(emp.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-end">
                  <Button variant="secondary" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                </div>
      </div>
    </>
  );
}

export default Employees;
