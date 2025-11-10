import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaShoppingCart, FaClipboardList, FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Dashboard", path: "/user-dashboard", icon: <MdDashboard /> },
    { name: "My Cart", path: "/user-dashboard/cart", icon: <FaShoppingCart /> },
    { name: "My Orders", path: "/user-dashboard/orders", icon: <FaClipboardList /> },
    { name: "My Kundlis", path: "/user-dashboard/kundlis", icon: <FaUser /> },
  ];

  return (
    <div
      className={`transition-all duration-500 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white shadow-xl border-r border-blue-700 ${
        isOpen ? "w-[20%]" : "w-[6%]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-blue-700">
        <h2
          className={`text-2xl font-semibold text-blue-200 tracking-wide transition-all duration-300 ${
            !isOpen && "opacity-0 hidden"
          }`}
        >
          My Account
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-200 hover:text-white text-2xl"
        >
          {isOpen ? <BiChevronLeft /> : <BiChevronRight />}
        </button>
      </div>

      {/* User Info */}
      {isOpen && (
        <div className="px-4 py-4 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <div>
              <p className="font-medium text-blue-100">{user.name || "User"}</p>
              <p className="text-sm text-blue-300">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <ul className="mt-8 space-y-3 px-2">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-4 py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-blue-200 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}
        
        {/* Logout */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 text-red-300 hover:bg-red-600 hover:text-white w-full text-left"
          >
            <span className="text-2xl"><FaSignOutAlt /></span>
            {isOpen && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;