import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes"; 
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import Summary from './components/EmployeeDashboard/Summary';
import Setting from "./components/EmployeeDashboard/Setting";
import AddOnboarding from "./components/onboarding/AddOnboarding";
import EditOnboarding from "./components/onboarding/EditOnboarding";
import OnboardingList from "./components/onboarding/OnboardingList";
import TOList from './components/timeOff/TOList';
import Request from './components/timeOff/Request';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to admin dashboard by default */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary />} />

          {/* Department Routes */}
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />

          {/* Employee Routes */}
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />

          {/* Onboarding Routes */}
          <Route path="onboarding" element={<OnboardingList />} />
          <Route path="onboarding/add" element={<AddOnboarding />} />
          <Route path="onboarding/edit/:id" element={<EditOnboarding />} />
        </Route>

        {/* Employee Dashboard Routes */}
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<Summary />} />
          
          {/* Employee Profile & Time-off Routes */}
          <Route path="profile/:id" element={<View />} />
          <Route path="time-off" element={<TOList />} />
          <Route path="request-time-off" element={<Request />} />

          {/* Onboarding Routes */}
          <Route path="onboarding" element={<OnboardingList />} />
          <Route path="onboarding/add" element={<AddOnboarding />} />
          <Route path="onboarding/edit/:id" element={<EditOnboarding />} />
          
          {/* Employee Settings Route */}
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
