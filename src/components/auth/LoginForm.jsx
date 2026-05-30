import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Input from "../common/Input";
import Button from "../common/Button";

const LoginForm = ({
  onSubmit,
  loading = false,
  error = "",
}) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">
            Welcome Back
          </h1>

          <p className="text-neutral-500 mt-2">
            Sign in to continue to your account.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Input
            label="Email Address"
            type="email"
            name="email"
            required
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password Field */}
          <div>
            <label className="text-sm font-medium text-neutral-800">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                required
                value={formData.password}
                onChange={handleChange}
                className="
                  w-full
                  px-4
                  py-3
                  pr-12
                  rounded-xl
                  border
                  border-neutral-300
                  focus:border-black
                  outline-none
                  transition
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-neutral-500
                  hover:text-black
                  transition
                  cursor-pointer
                "
              >
                {showPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="
                text-sm
                text-neutral-500
                hover:text-black
                transition
                cursor-pointer
              "
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full h-12"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            Don't have an account?
            <Link
              to="/register"
              className="
                ml-1
                font-medium
                text-black
                hover:underline
              "
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;