import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  name,
  disabled = false,
  required = false,
}) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-sm font-medium text-neutral-800">
          {label}
          {required && (
            <span className="text-red-500 ml-1">
              *
            </span>
          )}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          border
          bg-white
          outline-none
          transition
          text-sm
          ${
            error
              ? "border-red-500"
              : "border-neutral-300 focus:border-black"
          }
        `}
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;