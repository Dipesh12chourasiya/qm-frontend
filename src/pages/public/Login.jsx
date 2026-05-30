import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const {
    login,
    loading,
  } = useAuth();

  const [error, setError] =
    useState("");

  const handleLogin = async (
    formData
  ) => {
    try {
      setError("");

      const response =
        await login(formData);

      if (
        response.user.role ===
        "COMPANY"
      ) {
        navigate(
          "/company/dashboard"
        );
      } else {
        navigate(
          "/student/dashboard"
        );
      }
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6">
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Login;