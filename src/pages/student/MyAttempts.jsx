import React, {
  useEffect,
} from "react";

import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";

import { useAttempts } from "../../hooks/useAttempts";

const MyAttempts = () => {
  const {
    loading,
    attempts,
    getMyAttempts,
  } = useAttempts();

  useEffect(() => {
    getMyAttempts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <PageHeader
        title="My Attempts"
        subtitle="View your test history"
      />

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Test
              </th>

              <th className="p-4 text-left">
                Score
              </th>

              <th className="p-4 text-left">
                Percentage
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {attempts.map((attempt) => (
              <tr
                key={attempt._id}
                className="border-b"
              >
                <td className="p-4">
                  {attempt.testId?.title}
                </td>

                <td className="p-4">
                  {attempt.score}
                </td>

                <td className="p-4">
                  {attempt.percentage}%
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      attempt.percentage >= 40
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {attempt.status}
                  </span>
                </td>

                <td className="p-4">
                  {new Date(
                    attempt.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {attempts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No attempts found
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAttempts;