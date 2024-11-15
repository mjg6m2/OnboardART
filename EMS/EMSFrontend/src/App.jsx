import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login";
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/departments/DepartmentList.jsx';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import Summary from './components/employeeDashboard/Summary'
import View from './components/employee/View'


function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/admin-dashboard" element={
      <PrivateRoutes>
        <RoleBasedRoutes requiredRole = {["admin"]}>
          <AdminDashboard />
        </RoleBasedRoutes>
      </PrivateRoutes>

      }>
        <Route index element = {<AdminSummary/>}></Route>

        <Route path = "/admin-dashboard/department" element = {<DepartmentList/>}></Route>
      
      </Route>
    <Route 
      path="/employee-dashboard" 
      element={
        <PrivateRoutes>
          <RoleBasedRoutes requiredRole={["admin", "employee"]}>
            <EmployeeDashboard />
          </RoleBasedRoutes>
      </PrivateRoutes>
      }
    >
      <Route index element = {<Summary/>}></Route>
      
      <Route> path="/employee-dashboard/profile/:id" element={<View/>}</Route>

    </Route>
   </Routes>
  </BrowserRouter>
 );
}

export default App;
