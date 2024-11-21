import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-[#4B4E6D] text-[#F4F4F4] h-screen fixed left-0 top-0 bottom-0 w-64 shadow-md">
      <div className="bg-[#4B4E6D] h-16 flex items-center justify-center border-b-2 border-[#B8C0D6]">
        <h3 className="text-2xl text-center font-bold text-[#F4F4F4]">ART Onboarding</h3>
      </div>
      <div className="px-4 py-4 space-y-5">
        <NavLink
          to="/employee-dashboard"
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
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#B8C0D6] text-[#4B4E6D]"
                : "text-[#F4F4F4]"
            } flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-[#B8C0D6] hover:text-[#4B4E6D]`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#B8C0D6] text-[#4B4E6D]"
                : "text-[#F4F4F4]"
            } flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-[#B8C0D6] hover:text-[#4B4E6D]`
          }
        >
          <FaBuilding />
          <span>Time Off</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/onboarding-tasks`}
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-[#B8C0D6] text-[#4B4E6D]"
                : "text-[#F4F4F4]"
            } flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-[#B8C0D6] hover:text-[#4B4E6D]`
          }
        >
          <FaClipboardList />
          <span>Onboarding Tasks</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/setting"
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

export default Sidebar;
