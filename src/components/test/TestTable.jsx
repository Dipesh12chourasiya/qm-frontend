import React from "react";

const TestTable = ({ tests = [], onView, onActivate, onToggleStatus }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700 border-green-200";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">My Tests</h2>
        <p className="text-sm text-gray-500">
          Manage and publish your assessments
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="text-left px-6 py-3">Title</th>
              <th className="text-left px-6 py-3">Questions</th>
              <th className="text-left px-6 py-3">Duration</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Created</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {tests.map((test) => (
              <tr key={test._id} className="hover:bg-gray-50 transition">
                {/* TITLE (CLICKABLE) */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onView && onView(test)}
                    className="text-blue-600 font-medium hover:underline text-left"
                  >
                    {test.title}
                  </button>
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {test.totalQuestions}
                </td>

                <td className="px-6 py-4 text-gray-700">{test.duration} min</td>

                {/* STATUS (CLICKABLE TO TOGGLE) */}
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      test.status !== "ACTIVE" && onActivate && onActivate(test)
                    }
                    className={`px-3 py-1 rounded-full border text-xs font-semibold transition ${getStatusStyle(
                      test.status,
                    )}`}
                  >
                    {test.status === "ACTIVE" ? "ACTIVE" : "CLICK TO ACTIVATE"}
                  </button>
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(test.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {tests.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No tests created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestTable;
