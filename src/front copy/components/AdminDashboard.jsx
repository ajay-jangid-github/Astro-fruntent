import React from "react";
import { Outlet } from "react-router-dom";
import Dashboardsidebar from "./Dashboardsidebar";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Dashboardsidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;