import React, {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";

import { useTests } from "../../hooks/useTests";

const AvailableTests = () => {
  const {
    tests,
    loading,
    getAvailableTests,
    registerForTest,
  } = useTests();

  const [search, setSearch] =
    useState("");

  const [registeringId, setRegisteringId] =
    useState(null);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      await getAvailableTests();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (
    testId
  ) => {
    try {
      setRegisteringId(testId);

      const response =
        await registerForTest(testId);

      alert(
        response.message ||
          "Registered successfully"
      );

      await loadTests();
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Registration failed"
      );

      console.error(error);
    } finally {
      setRegisteringId(null);
    }
  };

  const filteredTests =
    tests?.filter((test) =>
      test.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    ) || [];

  if (loading && tests.length === 0) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Available Tests"
        subtitle="Browse and register for upcoming assessments"
      />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tests..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {filteredTests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-600">
            No Tests Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div
              key={test._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                {test.title}
              </h2>

              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-medium">
                    Duration:
                  </span>{" "}
                  {test.duration} mins
                </p>

                <p>
                  <span className="font-medium">
                    Questions:
                  </span>{" "}
                  {test.questionIds
                    ?.length || 0}
                </p>

                <p>
                  <span className="font-medium">
                    Created:
                  </span>{" "}
                  {new Date(
                    test.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    handleRegister(
                      test._id
                    )
                  }
                  disabled={
                    registeringId ===
                    test._id
                  }
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 rounded-lg transition"
                >
                  {registeringId ===
                  test._id
                    ? "Registering..."
                    : "Register"}
                </button>

                <Link
                  to={`/student/tests/${test._id}`}
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTests;