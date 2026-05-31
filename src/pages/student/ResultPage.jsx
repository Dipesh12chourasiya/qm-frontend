import React from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";

const ResultPage = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  if (!state) {
    return (
      <div className="p-6">
        Result not available
      </div>
    );
  }

  const {
    score,
    totalMarks,
    percentage,
  } = state;

  const passed =
    Number(percentage) >= 40;

  return (
    <div className="p-6">
      <PageHeader
        title="Test Result"
        subtitle="Assessment completed successfully"
      />

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-10">
          <div
            className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center text-4xl font-bold ${
              passed
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {percentage}%
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            {passed
              ? "PASS"
              : "FAIL"}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">
              Score
            </p>

            <h3 className="text-3xl font-bold">
              {score}
            </h3>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">
              Total Marks
            </p>

            <h3 className="text-3xl font-bold">
              {totalMarks}
            </h3>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">
              Percentage
            </p>

            <h3 className="text-3xl font-bold">
              {percentage}%
            </h3>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() =>
              navigate(
                "/student/attempts"
              )
            }
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            View My Attempts
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;