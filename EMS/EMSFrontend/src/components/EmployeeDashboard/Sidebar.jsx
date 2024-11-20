import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaCogs, FaMoneyBillWaveAlt, FaTachometerAlt, FaCalendarAlt, FaUserAlt, FaBuilding} from 'react-icons/fa'

const Sidebar = () => {
      const {user} = useAuth()
    return (
        <div className = "bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className ='bg-teal-600 h-12 flex items-center justify-center'>
                <h3 className = 'text-2x1 text-center font-pacific'>OnboardART</h3>
            </div>
            <div>
                <NavLink to="/employee-dashboard"
                    className = {({isActive}) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                
                <NavLink to={`/employee-dashboard/profile/${user._id}`}
                    className = {({isActive}) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaUserAlt />
                    <span>My Profile</span>
                </NavLink>
                
                <NavLink to="/employee-dashboard/time-off"
                    className = {({isActive}) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}
                    end
                    >
                    <FaBuilding />
                    <span>Time Off</span>
                </NavLink>
                
                <NavLink to={`/employee-dashboard/salary/${user._id}`}
                     className = {({isActive}) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaCalendarAlt />
                    <span>Salary</span>
                </NavLink>
                
                <NavLink to="/employee-dashboard/settings"
                     className = {({isActive}) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaMoneyBillWaveAlt />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar