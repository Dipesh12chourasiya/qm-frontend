import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";

import { useTests } from "../../hooks/useTests";
import { useAttempts } from "../../hooks/useAttempts";

const StudentDashboard = () => {
  const {
    tests = [],
    loading: testsLoading,
    getAvailableTests,
  } = useTests();

  const {
    attempts = [],
    loading: attemptsLoading,
    getMyAttempts,
  } = useAttempts();

  useEffect(() => {
    getAvailableTests();
    getMyAttempts();
  }, []);

  if (testsLoading || attemptsLoading) {
    return <Loader />;
  }

  const completedAttempts =
    attempts?.filter((a) => a.status === "COMPLETED") || [];

  const averageScore =
    completedAttempts.length > 0
      ? (
          completedAttempts.reduce(
            (acc, a) => acc + (a.percentage || 0),
            0
          ) / completedAttempts.length
        ).toFixed(1)
      : 0;

  const stats = [
    {
      label: "Available Tests",
      value: tests?.length || 0,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Completed",
      value: completedAttempts.length,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Average Score",
      value: `${averageScore}%`,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Total Attempts",
      value: attempts?.length || 0,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Student Dashboard"
        subtitle="Track your performance and upcoming tests"
      />

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-5 shadow-sm border hover:shadow-md transition ${stat.bg}`}
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <h2 className={`text-3xl font-bold mt-2 ${stat.color}`}>
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* AVAILABLE TESTS SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Available Tests
          </h2>

          <Link
            to="/student/tests"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All →
          </Link>
        </div>

        {tests?.length > 0 ? (
          <div className="space-y-4">
            {tests.slice(0, 5).map((test) => (
              <div
                key={test._id}
                className="flex items-center justify-between p-4 rounded-xl border hover:bg-gray-50 transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {test.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ⏱ {test.duration} mins
                  </p>
                </div>

                <Link
                  to={`/student/tests/${test._id}`}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No tests available</p>
            <p className="text-sm text-gray-400 mt-1">
              Check back later for new assessments
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;