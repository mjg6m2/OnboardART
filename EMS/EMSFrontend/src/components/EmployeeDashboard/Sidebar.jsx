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
    <div className="bg-[#58536E] text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      {/* Added margin-top to push the line down */}
      <div className="bg-[#58536E] h-14 lex items-center justify-center border-b-2 border-[#D1D3D8] mt-2">
        <h3 className="text-2xl text-center font-pacific">ART Onboarding</h3>
      </div>
      <div className="px-4 py-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#4A61C1]" : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
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
              isActive ? "bg-[#4A61C1]" : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#4A61C1]" : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Time Off</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/onboarding-tasks`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#4A61C1]" : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaClipboardList />
          <span>Onboarding Tasks</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#4A61C1]" : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
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
