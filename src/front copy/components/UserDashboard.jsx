import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;