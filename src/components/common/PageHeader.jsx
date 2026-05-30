import React from "react";

const PageHeader = ({
  title,
  subtitle,
  action,
}) => {
  return (
    <div className="flex justify-between items-center mb-8 border-b border-neutral-200 pb-5">
      <div>
        <h1 className="text-3xl font-bold text-black">
          {title}
        </h1>

        {subtitle && (
          <p className="text-neutral-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;