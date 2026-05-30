import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) => {
  const variants = {
    primary:
      "bg-black text-white hover:bg-neutral-800 border border-black",
    secondary:
      "bg-white text-black border border-neutral-300 hover:bg-neutral-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 border border-red-600",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        rounded-xl
        font-medium
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}

      {children}
    </button>
  );
};

export default Button;