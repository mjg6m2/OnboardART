import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext'; // Import AuthProvider
import Login from "./pages/Login";
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/departments/DepartmentList.jsx';
import AddDepartment from './components/departments/AddDepartment.jsx';
import EditDepartment from './components/departments/EditDepartment.jsx';

function App() {
  return (
   <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Redirect from root to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        
        {/* Login route */}
        <Route path="/login" element={<Login />} />
        
        {/* Admin dashboard with nested routes */}
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          {/* Admin dashboard summary */}
          <Route index element={<AdminSummary />} />
          
          {/* Departments route as a nested route under admin-dashboard */}
          <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />
        </Route>

        {/* Employee dashboard */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
}

export default App;

