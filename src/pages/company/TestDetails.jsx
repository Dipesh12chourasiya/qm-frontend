import React, {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import TestInstructions from "../../components/test/TestInstructions";
import Loader from "../../components/common/Loader";

import { useTests } from "../../hooks/useTests";

const TestDetails = () => {
  const { id } = useParams();

  const { getTestById } =
    useTests();

  const [test, setTest] =
    useState(null);

  useEffect(() => {
    if (id) {
      loadTest();
    }
  }, [id]);

  const loadTest = async () => {
    try {
      const res =
        await getTestById(id);

      setTest(res.test);
    } catch (error) {
      console.log(error);
    }
  };

  if (!test) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={test.title}
        subtitle={
          test.description ||
          "Assessment Details"
        }
      />

      <TestInstructions
        duration={test.duration}
        totalQuestions={
          test.totalQuestions
        }
        totalMarks={
          test.totalQuestions
        }
        passingMarks={Math.ceil(
          test.totalQuestions *
            0.6
        )}
      />

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-neutral-500">
            Questions
          </p>

          <p className="text-3xl font-bold mt-2">
            {
              test.totalQuestions
            }
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-neutral-500">
            Duration
          </p>

          <p className="text-3xl font-bold mt-2">
            {test.duration}
            <span className="text-base font-medium ml-1">
              min
            </span>
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-neutral-500">
            Max Attempts
          </p>

          <p className="text-3xl font-bold mt-2">
            {
              test.maxAttempts
            }
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-neutral-500">
            Status
          </p>

          <p
            className={`text-xl font-semibold mt-2 ${
              test.status ===
              "ACTIVE"
                ? "text-green-600"
                : test.status ===
                  "COMPLETED"
                ? "text-blue-600"
                : "text-orange-600"
            }`}
          >
            {test.status}
          </p>
        </div>
      </div>

      {/* Questions Section */}

      <div className="bg-white border border-neutral-200 rounded-3xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Questions (
          {
            test.questionIds
              ?.length
          }
          )
        </h2>

        {test.questionIds
          ?.length === 0 ? (
          <p className="text-neutral-500">
            No questions found.
          </p>
        ) : (
          <div className="space-y-6">
            {test.questionIds?.map(
              (
                question,
                index
              ) => (
                <div
                  key={
                    question._id
                  }
                  className="border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  {/* Header */}

                  <div className="bg-neutral-50 px-6 py-4 flex justify-between items-center border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>

                      <span className="font-medium">
                        Question
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {
                          question.category
                        }
                      </span>

                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          question.difficulty ===
                          "Easy"
                            ? "bg-green-100 text-green-700"
                            : question.difficulty ===
                              "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {
                          question.difficulty
                        }
                      </span>
                    </div>
                  </div>

                  {/* Body */}

                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-5">
                      {
                        question.questionText
                      }
                    </h3>

                    {/* Options */}

                    <div className="space-y-3">
                      {question.options?.map(
                        (
                          option,
                          idx
                        ) => (
                          <div
                            key={
                              idx
                            }
                            className={`p-4 rounded-xl border font-medium ${
                              option ===
                              question.correctAnswer
                                ? "bg-green-50 border-green-400 text-green-800"
                                : "bg-neutral-50 border-neutral-200"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span>
                                {String.fromCharCode(
                                  65 +
                                    idx
                                )}
                                .{" "}
                                {
                                  option
                                }
                              </span>

                              {option ===
                                question.correctAnswer && (
                                <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                                  Correct
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Footer */}

                    <div className="mt-6 pt-4 border-t flex flex-wrap gap-6 text-sm text-neutral-600">
                      <span>
                        Marks:{" "}
                        {
                          question.marks
                        }
                      </span>

                      <span>
                        Type:{" "}
                        {
                          question.questionType
                        }
                      </span>

                      <span>
                        Difficulty:{" "}
                        {
                          question.difficulty
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDetails;