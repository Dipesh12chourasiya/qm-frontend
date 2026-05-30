import React from "react";
import Button from "../common/Button";

const TestCard = ({
  test,
  onView,
  onEdit,
}) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">
          {test.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            test.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-neutral-100 text-neutral-700"
          }`}
        >
          {test.status}
        </span>
      </div>

      <p className="text-neutral-500 text-sm mt-3 line-clamp-3">
        {test.description}
      </p>

      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div>
          <p className="text-xl font-bold">
            {test.questions?.length || 0}
          </p>
          <p className="text-xs text-neutral-500">
            Questions
          </p>
        </div>

        <div>
          <p className="text-xl font-bold">
            {test.duration}
          </p>
          <p className="text-xs text-neutral-500">
            Minutes
          </p>
        </div>

        <div>
          <p className="text-xl font-bold">
            {test.totalMarks}
          </p>
          <p className="text-xs text-neutral-500">
            Marks
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={() =>
            onView(test)
          }
        >
          View
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            onEdit(test)
          }
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default TestCard;