import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    const email = "admin@admin.com"
    try {
      const response = await fetch("https://ems-backend-l1aj.onrender.com/api/admin/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          email
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Password changed successfully!");
        navigate("/dashboard");
      } else {
        alert(result.message || "Failed to change password.");
      }
    } catch (err) {
      console.error("Change password error:", err);
      alert("An error occurred while changing password.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Change Password
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
