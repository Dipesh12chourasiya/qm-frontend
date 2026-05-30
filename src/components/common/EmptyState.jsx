import React from "react";

const EmptyState = ({
  title = "No Data Found",
  description = "Nothing to display right now.",
}) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto">
        <span className="text-2xl">📄</span>
      </div>

      <h3 className="mt-5 text-xl font-semibold">
        {title}
      </h3>

      <p className="text-neutral-500 mt-2">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;