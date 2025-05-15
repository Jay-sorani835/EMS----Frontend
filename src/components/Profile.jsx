import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaVenusMars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div
        className="card shadow-lg rounded-4"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <div className="card-body p-4">
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8LrGjiUDcvYjUMk7jUJJZo0kK4Y4NzKxmQ&s"
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>

          <hr />

          <div className="mt-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <FaEnvelope className="me-2 text-primary" />
                <strong>Email:</strong> admin@admin.com.in
              </li>
              <li className="list-group-item">
                <FaPhone className="me-2 text-success" />
                <strong>Mobile:</strong> 1231231231
              </li>
              <li className="list-group-item">
                <FaVenusMars className="me-2 text-danger" />
                <strong>Gender:</strong> Male
              </li>
            </ul>
          </div>
          <div className="mt-3 text-end">
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
