import React from "react";

const TestTable = ({
  tests = [],
  onView,
  onEdit,
}) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-neutral-100">
            <th className="text-left p-4">
              Title
            </th>

            <th className="text-left p-4">
              Questions
            </th>

            <th className="text-left p-4">
              Duration
            </th>

            <th className="text-left p-4">
              Marks
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tests.map((test) => (
            <tr
              key={test._id}
              className="border-t border-neutral-200"
            >
              <td className="p-4">
                {test.title}
              </td>

              <td className="p-4">
                {test.questions?.length}
              </td>

              <td className="p-4">
                {test.duration} min
              </td>

              <td className="p-4">
                {test.totalMarks}
              </td>

              <td className="p-4">
                {test.status}
              </td>

              <td className="p-4">
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      onView(test)
                    }
                    className="font-medium hover:underline"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      onEdit(test)
                    }
                    className="font-medium hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {tests.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-neutral-500"
              >
                No Tests Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TestTable;