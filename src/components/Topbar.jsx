import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

const Topbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/logout");
  };

  return (
    <div className="d-flex justify-content-between align-items-center bg-light p-3 shadow-sm position-relative">
      <h4 className="m-0">Welcome, Admin</h4>

      <div
        className="position-relative"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8LrGjiUDcvYjUMk7jUJJZo0kK4Y4NzKxmQ&s"
          alt="avatar"
          className="rounded-circle shadow"
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
        />

        {showMenu && (
          <div
            className="dropdown-menu show position-absolute end-0 mt-2"
            style={{ display: "block", minWidth: "150px", zIndex: 999 }}
          >
            <button className="dropdown-item" onClick={() => navigate("/profile")}>
              Profile
            </button>
            <button className="dropdown-item" onClick={() => navigate("/change-password")}>
              Change Password
            </button>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
