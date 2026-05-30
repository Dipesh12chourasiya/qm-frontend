import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../../components/auth/RegisterForm";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { register, loading } =
    useAuth();

  const [error, setError] =
    useState("");

  const handleRegister = async (
    formData
  ) => {
    try {
      setError("");

      const response =
        await register(formData);

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
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <RegisterForm
        onSubmit={handleRegister}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Register;