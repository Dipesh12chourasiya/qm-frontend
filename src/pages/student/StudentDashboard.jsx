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
    attempts?.filter(
      (attempt) =>
        attempt.status === "COMPLETED"
    ) || [];

  const averageScore =
    completedAttempts.length > 0
      ? (
          completedAttempts.reduce(
            (acc, attempt) =>
              acc +
              (attempt.percentage || 0),
            0
          ) / completedAttempts.length
        ).toFixed(1)
      : 0;

  return (
    <div className="p-6">
      <PageHeader
        title="Student Dashboard"
        subtitle="Track your assessments and performance"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-gray-500">
            Available Tests
          </h3>

          <p className="text-3xl font-bold text-blue-600">
            {tests?.length || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-gray-500">
            Completed
          </h3>

          <p className="text-3xl font-bold text-green-600">
            {completedAttempts.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-gray-500">
            Average Score
          </h3>

          <p className="text-3xl font-bold text-purple-600">
            {averageScore}%
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-gray-500">
            Total Attempts
          </h3>

          <p className="text-3xl font-bold text-orange-600">
            {attempts?.length || 0}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Available Tests
          </h2>

          <Link
            to="/student/tests"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>

        {tests?.length > 0 ? (
          <div className="space-y-4">
            {tests
              ?.slice(0, 5)
              ?.map((test) => (
                <div
                  key={test._id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {test.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Duration:{" "}
                      {test.duration} mins
                    </p>
                  </div>

                  <Link
                    to={`/student/tests/${test._id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    View
                  </Link>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No tests available.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;