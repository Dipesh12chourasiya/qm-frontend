import React from "react";

const ResultCard = ({
  attempt,
}) => {
  const passed =
    attempt.percentage >= 60;

  return (
    <div className="max-w-2xl mx-auto bg-white border border-neutral-200 rounded-3xl p-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Result
        </h1>

        <p className="text-neutral-500 mt-2">
          Test Completed
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-10 text-center">
        <div>
          <p className="text-3xl font-bold">
            {attempt.score}
          </p>

          <p className="text-neutral-500">
            Score
          </p>
        </div>

        <div>
          <p className="text-3xl font-bold">
            {attempt.percentage}
            %
          </p>

          <p className="text-neutral-500">
            Percentage
          </p>
        </div>

        <div>
          <p
            className={`text-3xl font-bold ${
              passed
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {passed
              ? "PASS"
              : "FAIL"}
          </p>

          <p className="text-neutral-500">
            Status
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-neutral-200 pt-6">
        <div className="flex justify-between">
          <span>
            Attempt Status
          </span>

          <span className="font-medium">
            {attempt.status}
          </span>
        </div>

        <div className="flex justify-between mt-3">
          <span>
            Submitted At
          </span>

          <span className="font-medium">
            {new Date(
              attempt.submittedAt
            ).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;