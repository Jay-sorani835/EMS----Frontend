// Layout.js
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
