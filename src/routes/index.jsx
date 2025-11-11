import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import Admin from "../Pages/Dashboard/Admin";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import User from "../Pages/Dashboard/User";
import UserProfile from "../Pages/Dashboard/AdminProfile/UserProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";
import Vendors from "../Pages/Dashboard/Vendors";
import OurTransactions from "../Pages/Dashboard/OurTransactions";
import Vendor from "../Pages/Dashboard/Vendor";
import JobCategory from "../Pages/Dashboard/JobCategory";
import Language from "../Pages/Dashboard/Language";
import Category from "../Pages/Dashboard/Category";
import SubCategory from "../Pages/Dashboard/SubCategory";
import SupportRequest from "../Pages/Dashboard/SupportRequest";
import PrivateRoute from "./PrivateRoute";
import VerificationRequests from "../Pages/Dashboard/VerificationRequests";
import JobList from "../Pages/Dashboard/JobList";
import JobDetailsPage from "../Pages/Dashboard/JobDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/customers",
        element: <Users />,
      },
      {
        path: "/customers/:id",
        element: <User />,
      },
      {
        path: "/service-provider",
        element: <Vendors />,
      },
      {
        path: "/service-provider/:id",
        element: <Vendor />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/sub-category",
        element: <SubCategory />,
      },
      {
        path: "/job-category",
        element: <JobCategory />,
      },
      {
        path: "/jobs-list",
        element: <JobList />,
      },
      {
        path: "/jobs-list/:id",
        element: <JobDetailsPage />,
      },
      {
        path: "/verification-request",
        element: <VerificationRequests />,
      },
      {
        path: "/language",
        element: <Language />,
      },
      {
        path: "/payment-history",
        element: <OurTransactions />,
      },
      {
        path: "/personal-information",
        element: <UserProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "support-request",
        element: <SupportRequest />,
      },
      {
        path: "/make-admin",
        element: <Admin />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
