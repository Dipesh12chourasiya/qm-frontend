import React from "react";
import Button from "../common/Button";

const QuestionCard = ({
  question,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium">
          {question.category}
        </span>

        <span
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${
              question.difficulty ===
              "Easy"
                ? "bg-green-100 text-green-700"
                : question.difficulty ===
                  "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {question.difficulty}
        </span>
      </div>

      <h3 className="font-semibold text-lg line-clamp-2">
        {question.question}
      </h3>

      <div className="mt-4 text-sm text-neutral-500">
        Marks: {question.marks}
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          variant="secondary"
          onClick={() =>
            onEdit(question)
          }
        >
          Edit
        </Button>

        <Button
          variant="danger"
          onClick={() =>
            onDelete(question._id)
          }
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;