import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaClipboardList,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-[#4B4E6D] text-[#F4F4F4] h-screen fixed left-0 top-0 bottom-0 w-64 shadow-md">
      <div className="bg-[#4B4E6D] h-16 flex items-center justify-center border-b-2 border-[#B8C0D6]">
        {/* Making "ART Onboarding" bold and slightly larger */}
        <h3 className="text-2xl text-center font-bold text-[#F4F4F4]">ART Onboarding</h3>
      </div>
      {/* Padding below the title to push content down */}
      <div className="px-4 py-4 space-y-5"> {/* Slightly increased space-y from 4 to 5 */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#B8C0D6] text-[#4B4E6D]"
                : "text-[#F4F4F4]"
            } flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-[#B8C0D6] hover:text-[#4B4E6D]`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#B8C0D6] text-[#4B4E6D]"
                : "text-[#F4F4F4]"
            } flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-[#B8C0D6] hover:text-[#4B4E6D]`
          }
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#B8C0D6] text-[#4B4E6D]"
                : "text-[#F4F4F4]"
            } flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-[#B8C0D6] hover:text-[#4B4E6D]`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#B8C0D6] text-[#4B4E6D]"
                : "text-[#F4F4F4]"
            } flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-[#B8C0D6] hover:text-[#4B4E6D]`
          }
        >
          <FaCalendarAlt />
          <span>Time Off</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/onboarding"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#B8C0D6] text-[#4B4E6D]"
                : "text-[#F4F4F4]"
            } flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-[#B8C0D6] hover:text-[#4B4E6D]`
          }
        >
          <FaClipboardList />
          <span>Onboarding</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#B8C0D6] text-[#4B4E6D]"
                : "text-[#F4F4F4]"
            } flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-[#B8C0D6] hover:text-[#4B4E6D]`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
