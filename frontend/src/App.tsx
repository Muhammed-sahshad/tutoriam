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
import ProtectedRoute from "./components/user/auth/protected-routes";
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
import CoursesPage from "./pages/instructor/Courses";
import SingleCoursePage from "./pages/instructor/CourseDetails";
import EditCoursePage from "./pages/instructor/EditCoursePage";
import UserCoursesPage from "./pages/user/CoursesPage";
import UserCourseDetailsPage from "./pages/user/UserCourseDetails";
import CartPage from "./pages/user/CartPage";
import WishlistPage from "./pages/user/WishlistPage";
import NotFound from "./pages/user/NotFound";
import CategoriesPage from "./pages/admin/category-page";
import { useAppDispatch } from "./redux/store";
import { fetchCartItems } from "./redux/thunks/cartThunk";
import { UserRole } from "./constants/role";
import WatchCoursePage from "./components/user/watch-course/watch-course-page";

const App = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
        try {
          await refreshToken(dispatch);
          appDispatch(fetchCartItems())
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
      <Toaster richColors position="top-right"/>
      <Routes>
        <Route path="/payment-success" element={<div> payment success</div>}/>
        <Route path="/payment-cancel" element={<div> payment cancelled</div>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>

        <Route element={<ProtectedRoute role={[UserRole.USER]}/>}>
              <Route path="/profile" element={<UserProfile /> } />
              <Route path="/become-instructor" element={<BecomeInstructorPage/>}/>
              <Route path="/become-instructor/application" element={<TutorApplicationForm/>}/>
              {/* <Route path="/enrolled-courses" element={}/> */}
              <Route path="/enrolled-courses/watch/:courseId" element={<WatchCoursePage/>}/>
        </Route>

        <Route element={<ProtectedRoute role={[UserRole.INSTRUCTOR]}/>}>
          <Route path="/instructor/dashboard" element={<InstructorDashboardPage/>}/>
          <Route path="/instructor/create-course" element={<CreateCoursePage/>}/>
          <Route path="/instructor/my-courses" element={<CoursesPage/>}/>
          <Route path="/instructor/my-courses/:courseId" element={<SingleCoursePage/>}/>
          <Route path="/instructor/my-courses/:courseId/edit" element={<EditCoursePage/>}/>
          {/* <Route path="/instructor/courses" element={<UserCoursesPage/>}/>
              <Route path="/instructor/courses/:courseId" element={<UserCourseDetailsPage/>}/>
              <Route path="/instructor/cart" element={<CartPage/>}/>
              <Route path="/instructor/wishlist" element={<WishlistPage/>} /> */}
        </Route>

        <Route element={<ProtectedRoute role={[UserRole.USER,UserRole.INSTRUCTOR ]} />}>
          <Route path="/courses" element={<UserCoursesPage />} />
          <Route path="/courses/:courseId" element={<UserCourseDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage/>}/>

        <Route element={<ProtectedRoute role={[UserRole.ADMIN]}/>}>
            <Route path="/admin" element={<DashboardLayout/>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage/>}/>
            <Route path="tutors" element={<TutorsPage/>}/>
            <Route path="applications" element={<InstructorApplicationsPage/>}/>
            <Route path="categories" element={<CategoriesPage/>}/>
            </Route>
        </Route>
        <Route path="*" element={<NotFound/>} /> 
      </Routes>
    </Router>
  );
};

export default App;
