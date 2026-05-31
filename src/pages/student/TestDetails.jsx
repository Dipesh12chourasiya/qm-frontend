import React, {
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import TestInstructions from "../../components/test/TestInstructions";

import { useTests } from "../../hooks/useTests";

const TestDetails = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const {
    loading,
    test,
    getTestById,
  } = useTests();

  useEffect(() => {
    getTestById(id);
  }, [id]);

  if (loading || !test) {
    return <Loader />;
  }

  const handleStartTest =
    () => {
      navigate(
        `/student/attempt/${test._id}`
      );
    };

  return (
    <div className="p-6">
      <PageHeader
        title="Test Details"
        subtitle="Read all instructions carefully before starting."
      />

      <div className="bg-white rounded-xl shadow-md p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {test.title}
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="border rounded-lg p-4">
            <p className="text-gray-500">
              Duration
            </p>

            <h3 className="text-2xl font-bold">
              {test.duration} min
            </h3>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-gray-500">
              Questions
            </p>

            <h3 className="text-2xl font-bold">
              {test.questionIds
                ?.length || 0}
            </h3>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-gray-500">
              Status
            </p>

            <h3 className="text-green-600 font-bold">
              Available
            </h3>
          </div>
        </div>

        <div className="mb-8">
          <TestInstructions />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-8">
          <h3 className="font-semibold mb-2">
            Important Rules
          </h3>

          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li>
              Do not refresh the page.
            </li>

            <li>
              Do not switch browser tabs.
            </li>

            <li>
              Ensure stable internet
              connection.
            </li>

            <li>
              Test will auto-submit
              when time expires.
            </li>

            <li>
              Each test can only be
              attempted once.
            </li>
          </ul>
        </div>

        <button
          onClick={handleStartTest}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold"
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default TestDetails;