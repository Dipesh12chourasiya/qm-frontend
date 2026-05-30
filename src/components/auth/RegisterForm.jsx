import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Input from "../common/Input";
import Button from "../common/Button";

const RegisterForm = ({
  onSubmit,
  loading = false,
  error = "",
}) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    companyName: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === "COMPANY") {
      payload.companyName =
        formData.companyName;

      payload.website =
        formData.website;
    }

    onSubmit?.(payload);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">
            Create Account
          </h1>

          <p className="text-neutral-500 mt-2">
            Join the platform and start your journey.
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
            label="Full Name"
            name="name"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-800">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Minimum 6 characters"
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
                  bg-white
                  outline-none
                  focus:border-black
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

          {/* Role Select */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Account Type
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-neutral-300
                bg-white
                outline-none
                focus:border-black
                transition
              "
            >
              <option value="USER">
                Student / Candidate
              </option>

              <option value="COMPANY">
                Company / Recruiter
              </option>
            </select>
          </div>

          {/* Company Fields */}
          {formData.role ===
            "COMPANY" && (
            <>
              <Input
                label="Company Name"
                name="companyName"
                placeholder="Google"
                value={
                  formData.companyName
                }
                onChange={handleChange}
              />

              <Input
                label="Company Website"
                name="website"
                placeholder="https://company.com"
                value={formData.website}
                onChange={handleChange}
              />
            </>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full h-12"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            Already have an account?
            <Link
              to="/login"
              className="
                ml-1
                font-medium
                text-black
                hover:underline
                cursor-pointer
              "
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;