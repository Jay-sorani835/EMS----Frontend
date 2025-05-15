import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Row, Col, Card } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate(); 

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("https://ems-backend-ylc6.onrender.com/api/departments/all", {
        withCredentials: true,
      });
      setDepartments(res.data);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Add department
  const addDepartment = async () => {
    if (!name.trim()) return alert("Department name is required");

    try {
      const res = await axios.post(
        "https://ems-backend-ylc6.onrender.com/api/departments/add",
        { name },
        { withCredentials: true }
      );
      setDepartments([...departments, res.data]);
      setName("");
    } catch (error) {
      console.error("Add failed", error);
      alert("Add failed");
    }
  };

  // Edit department
  const editDepartment = async (id, oldName) => {
    const newName = prompt("Edit department name:", oldName);
    if (newName && newName !== oldName) {
      try {
        await axios.put(
          `https://ems-backend-ylc6.onrender.com/api/departments/edit/${id}`,
          { name: newName },
          { withCredentials: true }
        );
        setDepartments(
          departments.map((dept) =>
            dept.id === id ? { ...dept, name: newName } : dept
          )
        );
      } catch (error) {
        console.error("Edit failed", error);
        alert("Edit failed");
      }
    }
  };

  // Delete department
  const deleteDepartment = async (id) => {
    if (window.confirm("Are you sure to delete this department?")) {
      try {
        await axios.delete(
          `https://ems-backend-ylc6.onrender.com/api/departments/delete/${id}`,
          { withCredentials: true }
        );
        setDepartments(departments.filter((d) => d.id !== id));
      } catch (error) {
        console.error("Delete failed", error);
        alert("Delete failed");
      }
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Manage Departments</Card.Title>

        <Form>
          <Row className="g-2 align-items-end">
            <Col xs={8} md={6}>
              <Form.Control
                placeholder="Enter new department name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={addDepartment}>
                <FaPlus className="me-2" /> Add
              </Button>
            </Col>
          </Row>
        </Form>

        <Table bordered hover className="mt-4">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={dept.id}>
                <td>{index + 1}</td>
                <td>{dept.name}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => editDepartment(dept.id, dept.name)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteDepartment(dept.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
            {departments.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center">
                  No departments found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="mt-3 text-end">
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Departments;
