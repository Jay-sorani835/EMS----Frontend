import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./login1.css";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ems-backend-l1aj.onrender.com/api/employees/all")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Failed to fetch employee data.");
      });
  }, []);

  const handleEdit = (emp) => {
    setSelectedEmployee({ ...emp });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `https://ems-backend-l1aj.onrender.com/api/employees/update/${selectedEmployee.id}`,
        selectedEmployee
      );
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployee.id ? selectedEmployee : emp
        )
      );
      setShowEditModal(false);
      alert("Employee updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `https://ems-backend-l1aj.onrender.com/api/employees/${id}`,
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

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <Form>
              <Form.Group controlId="fname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  value={selectedEmployee.fname}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="lname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={selectedEmployee.lname}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={selectedEmployee.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="mobile">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={selectedEmployee.mobile}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={selectedEmployee.gender}
                  onChange={handleInputChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  value={selectedEmployee.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={selectedEmployee.department}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Employees;
