import { Routes, Route } from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";
import StudentLayout from "../components/layout/StudentLayout";
import CompanyLayout from "../components/layout/CompanyLayout";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Unauthorized from "../pages/public/Unauthorized";
import NotFound from "../pages/public/NotFound";

import CompanyDashboard from "../pages/company/CompanyDashboard";
import QuestionBank from "../pages/company/QuestionBank";
import CreateQuestion from "../pages/company/CreateQuestion";
import EditQuestion from "../pages/company/EditQuestion";
import CreateTest from "../pages/company/CreateTest";
import MyTests from "../pages/company/MyTests";
import TestDetails from "../pages/company/TestDetails";
import Analytics from "../pages/company/Analytics";

import UserRoute from "./UserRoute";
import ProtectedRoute from "./ProtectedRoute";
import CompanyRoute from "./CompanyRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}

      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={
            <UserRoute>
              <Login />
            </UserRoute>
          }
        />

        <Route
          path="/register"
          element={
            <UserRoute>
              <Register />
            </UserRoute>
          }
        />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />
      </Route>

      {/* COMPANY ROUTES */}

      <Route
        path="/company"
        element={
          <ProtectedRoute>
            <CompanyRoute>
              <CompanyLayout />
            </CompanyRoute>
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={<CompanyDashboard />}
        />

        <Route
          path="questions"
          element={<QuestionBank />}
        />

        <Route
          path="questions/create"
          element={<CreateQuestion />}
        />

        <Route
          path="questions/edit/:id"
          element={<EditQuestion />}
        />

        <Route
          path="create-test"
          element={<CreateTest />}
        />

        <Route
          path="tests"
          element={<MyTests />}
        />

        <Route
          path="tests/:id"
          element={<TestDetails />}
        />

        <Route
          path="analytics"
          element={<Analytics />}
        />
      </Route>

      {/* STUDENT ROUTES */}

      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        {/* Add student pages here */}
      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default AppRoutes;