// AdminDashboard.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/NavBar';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100">
        <Navbar />
        <div className="p-4">
          {/* This will show the nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

