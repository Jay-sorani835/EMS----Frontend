import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("https://ems-backend-ylc6.onrender.com/api/admin/logout", null, {
          withCredentials: true,
        });
        navigate("/");
      } catch (err) {
        console.error("Logout failed", err);
        alert("Failed to logout");
      }
    };
    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
