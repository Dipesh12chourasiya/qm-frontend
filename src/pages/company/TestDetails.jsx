import React from "react";

import PageHeader from "../../components/common/PageHeader";
import TestInstructions from "../../components/test/TestInstructions";

const TestDetails = () => {
  const test = {
    title:
      "Java Developer Assessment",
    description:
      "Core Java, OOP, Collections, JDBC",
    duration: 60,
    totalMarks: 100,
    passingMarks: 60,
    questions: new Array(20),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={test.title}
        subtitle={
          test.description
        }
      />

      <TestInstructions
        duration={test.duration}
        totalQuestions={
          test.questions.length
        }
        totalMarks={
          test.totalMarks
        }
        passingMarks={
          test.passingMarks
        }
      />

      <div className="bg-white border border-neutral-200 rounded-2xl p-6">
        <h2 className="font-semibold text-xl mb-4">
          Test Summary
        </h2>

        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-neutral-500">
              Questions
            </p>
            <p className="text-2xl font-bold">
              {
                test.questions
                  .length
              }
            </p>
          </div>

          <div>
            <p className="text-neutral-500">
              Duration
            </p>
            <p className="text-2xl font-bold">
              {test.duration}
            </p>
          </div>

          <div>
            <p className="text-neutral-500">
              Marks
            </p>
            <p className="text-2xl font-bold">
              {
                test.totalMarks
              }
            </p>
          </div>

          <div>
            <p className="text-neutral-500">
              Pass Marks
            </p>
            <p className="text-2xl font-bold">
              {
                test.passingMarks
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;