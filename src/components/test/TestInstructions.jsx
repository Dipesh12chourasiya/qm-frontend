import React from "react";

const TestInstructions = ({
  duration,
  totalQuestions,
  totalMarks,
  passingMarks,
}) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">
        Test Instructions
      </h2>

      <ul className="space-y-3 text-neutral-700">
        <li>
          • Total Questions:
          <span className="font-semibold ml-2">
            {totalQuestions}
          </span>
        </li>

        <li>
          • Duration:
          <span className="font-semibold ml-2">
            {duration} Minutes
          </span>
        </li>

        <li>
          • Total Marks:
          <span className="font-semibold ml-2">
            {totalMarks}
          </span>
        </li>

        <li>
          • Passing Marks:
          <span className="font-semibold ml-2">
            {passingMarks}
          </span>
        </li>

        <li>
          • Do not refresh the page
        </li>

        <li>
          • Tab switching may be monitored
        </li>

        <li>
          • Webcam monitoring may be enabled
        </li>

        <li>
          • Submit before timer ends
        </li>
      </ul>
    </div>
  );
};

export default TestInstructions;