import React from "react";

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
          {questions.map((q) => (
            <tr
              key={q._id}
              className="border-t border-neutral-200"
            >
              <td className="p-4 max-w-md">
                {q.question}
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
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      onEdit(q)
                    }
                    className="font-medium hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(q._id)
                    }
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {questions.length === 0 && (
            <tr>
              <td
                colSpan="5"
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