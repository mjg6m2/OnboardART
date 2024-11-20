import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBasedRoutes"; 
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        
        {/* Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>

          {/* Department Routes */}
          <Route path="departments" element={<DepartmentList />}></Route>
          <Route path="add-department" element={<AddDepartment />}></Route>
          <Route path="department/:id" element={<EditDepartment />}></Route>

          {/* Employee Routes */}
          <Route path="employees" element={<List />}></Route>
          <Route path="add-employee" element={<Add />}></Route>
          <Route path="employees/:id" element={<View />}></Route>
          <Route path="employees/edit/:id" element={<Edit />}></Route>

          <Route path="setting" element={<Setting />}></Route>

          {/* Onboarding Routes - Nested under Admin Dashboard */}
          <Route path="onboarding" element={<OnboardingList />} />
          <Route path="onboarding/add" element={<AddOnboarding />} />
          <Route path="onboarding/edit/:id" element={<EditOnboarding />} />

        </Route>

        {/* Employee Dashboard Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />}></Route>

          <Route path="profile/:id" element={<View />}></Route>
          <Route path="setting" element={<Setting />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
