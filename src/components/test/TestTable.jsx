import React from "react";
import { Link } from "react-router-dom";

const TestTable = ({
  tests = [],
  onView,
  onActivate,
  onComplete,
}) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";

      case "DRAFT":
        return "bg-yellow-100 text-yellow-700";

      case "COMPLETED":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b bg-gradient-to-r from-slate-50 to-gray-50">
        <h2 className="text-xl font-bold text-gray-800">
          My Tests
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage assessments, publish tests, and view analytics
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 text-left">
                Test
              </th>

              <th className="px-6 py-4 text-center">
                Questions
              </th>

              <th className="px-6 py-4 text-center">
                Duration
              </th>

              <th className="px-6 py-4 text-center">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Created
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tests.map((test) => (
              <tr
                key={test._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Test Name */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onView?.(test)}
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {test.title}
                  </button>
                </td>

                {/* Questions */}
                <td className="px-6 py-4 text-center text-gray-700">
                  {test.totalQuestions}
                </td>

                {/* Duration */}
                <td className="px-6 py-4 text-center text-gray-700">
                  {test.duration} min
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                      test.status
                    )}`}
                  >
                    {test.status}
                  </span>
                </td>

                {/* Created */}
                <td className="px-6 py-4 text-center text-gray-500">
                  {new Date(
                    test.createdAt
                  ).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap justify-center gap-2">
                    {test.status === "DRAFT" && (
                      <button
                        onClick={() => onActivate?.(test)}
                        className="px-3 py-2 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Activate
                      </button>
                    )}

                    {test.status === "ACTIVE" && (
                      <button
                        onClick={() => onComplete?.(test)}
                        className="px-3 py-2 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Complete
                      </button>
                    )}

                    <Link
                      to={`/company/tests/${test._id}/analytics`}
                      className="px-3 py-2 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Analytics
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {tests.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-gray-400"
                >
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