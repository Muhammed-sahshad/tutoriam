import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/user/LoginPage";
import AdminLoginPage from "./pages/admin/LoginPage"
import OtpPage from "./pages/user/OtpPage";
import HomePage from "./pages/user/HomePage";
import UserProfile from "./pages/user/UserProfile";
import { useEffect, useState } from "react";
import { refreshToken } from "./services/authService";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/user/auth/ProtectedRoute";
import DashboardLayout from "./components/admin/layout/DashboardLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import UsersPage from "./pages/admin/UsersPage";
import TutorsPage from "./pages/admin/TutorsPage";
import { Toaster } from "sonner";
import BecomeInstructorPage from "./pages/user/BecomeInstructorPage";
import TutorApplicationForm from "./pages/user/TutorApplicationPage";
import ForgotPasswordPage from "./pages/user/ForgotPasswordPage";
import ResetPasswordPage from "./pages/user/ResetPasswordPage";
import InstructorApplicationsPage from "./pages/admin/InstructorApplications";
import InstructorDashboardPage from "./pages/instructor/InstructorDashboardPage";
import CreateCoursePage from "./pages/instructor/CreateCoursePage";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
        try {
          await refreshToken(dispatch);
        } catch (error) {
          console.log("Error during token refresh", error);
        } finally {
          setLoading(false);
        }
    };

    fetchUser();
  }, [dispatch]);
  if (loading) {
    return <div></div>;
  }
  return (
    <Router>
      <Toaster richColors/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>

        <Route element={<ProtectedRoute role="user"/>}>
              <Route path="/profile" element={<UserProfile /> } />
              <Route path="/become-instructor" element={<BecomeInstructorPage/>}/>
              <Route path="/become-instructor/application" element={<TutorApplicationForm/>}/>
        </Route>

        <Route element={<ProtectedRoute role="instructor"/>}>
          <Route path="/instructor/dashboard" element={<InstructorDashboardPage/>}/>
          <Route path="/instructor/create-course" element={<CreateCoursePage/>}/>
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage/>}/>

        <Route element={<ProtectedRoute role="admin"/>}>
            <Route path="/admin" element={<DashboardLayout/>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage/>}/>
            <Route path="tutors" element={<TutorsPage/>}/>
            <Route path="instructor-applications" element={<InstructorApplicationsPage/>}/>
            </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
