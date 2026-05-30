import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-10 h-10 border-4 border-neutral-300 border-t-black rounded-full animate-spin" />

      <p className="mt-4 text-neutral-600 text-sm">
        {text}
      </p>
    </div>
  );
};

export default Loader;