import React from "react";
import { Trash2, Pencil } from "lucide-react";

const QuestionTable = ({
  questions = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-neutral-100">
            <th className="text-left p-4 w-16">
              #
            </th>

            <th className="text-left p-4">
              Question
            </th>

            <th className="text-left p-4">
              Category
            </th>

            <th className="text-left p-4">
              Difficulty
            </th>

            <th className="text-left p-4">
              Marks
            </th>

            <th className="text-left p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {questions.map((q, index) => (
            <tr
              key={q._id || index}
              className="border-t border-neutral-200"
            >
              <td className="p-4 font-medium">
                {index + 1}
              </td>

              <td className="p-4 max-w-md">
                {q.questionText}
              </td>

              <td className="p-4">
                {q.category}
              </td>

              <td className="p-4">
                {q.difficulty}
              </td>

              <td className="p-4">
                {q.marks}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEdit(q)}
                    className="p-2 rounded-lg hover:bg-neutral-100 transition"
                    title="Edit Question"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(q._id)
                    }
                    className="p-2 rounded-lg hover:bg-red-50 transition"
                    title="Delete Question"
                  >
                    <Trash2
                      size={18}
                      className="text-red-500"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {questions.length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="text-center py-10 text-neutral-500"
              >
                No Questions Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;