import React from "react";
import {
  Pencil,
  Trash2,
  Award,
} from "lucide-react";

import Button from "../common/Button";

const QuestionCard = ({
  question,
  onEdit,
  onDelete,
}) => {
  const difficultyStyles = {
    Easy: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Medium:
      "bg-amber-50 text-amber-700 border border-amber-200",
    Hard: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <div className="group bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
            {question.category}
          </span>

          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              difficultyStyles[
                question.difficulty
              ]
            }`}
          >
            {question.difficulty}
          </span>
        </div>

        <div className="text-xs text-neutral-400">
          ID:{" "}
          {question._id?.slice(-6)}
        </div>
      </div>

      {/* Question */}
      <div className="min-h-[80px]">
        <h3 className="text-lg font-semibold text-neutral-900 leading-relaxed">
          {question.questionText}
        </h3>
      </div>

      {/* Metadata */}
      <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Award size={16} />

          <span>
            {question.marks} Mark
            {question.marks > 1
              ? "s"
              : ""}
          </span>
        </div>

        <div className="text-sm text-neutral-500">
          Type:{" "}
          {question.questionType}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <Button
          variant="secondary"
          onClick={() =>
            onEdit(question)
          }
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Pencil size={16} />
          Edit
        </Button>

        <Button
          variant="danger"
          onClick={() =>
            onDelete(question._id)
          }
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;