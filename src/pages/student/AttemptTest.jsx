import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";

import { useAttempts } from "../../hooks/useAttempts";

const AttemptTest = () => {
  const { testId } = useParams();

  const navigate = useNavigate();

  const {
    loading,
    startTest,
    saveAnswer,
    submitTest,
    attempt,
    questions,
  } = useAttempts();

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswers, setSelectedAnswers] =
    useState({});

  useEffect(() => {
    startTest(testId);
  }, [testId]);

  const handleOptionSelect = async (
    questionId,
    option
  ) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));

    await saveAnswer(
      attempt._id,
      questionId,
      option
    );
  };

  const handleSubmit = async () => {
    const response = await submitTest(
      attempt._id
    );

    navigate("/student/result", {
      state: response.result,
    });
  };

  if (
    loading ||
    !attempt ||
    questions.length === 0
  ) {
    return <Loader />;
  }

  const question =
    questions[currentQuestion];

  return (
    <div className="p-6">
      <PageHeader
        title="Assessment"
        subtitle="Answer all questions carefully"
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} /
                {questions.length}
              </span>
            </div>

            <h2 className="text-xl font-semibold mb-6">
              {question.questionText}
            </h2>

            <div className="space-y-4">
              {question.options.map(
                (option, index) => (
                  <label
                    key={index}
                    className="flex items-center border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name={question._id}
                      checked={
                        selectedAnswers[
                          question._id
                        ] === option
                      }
                      onChange={() =>
                        handleOptionSelect(
                          question._id,
                          option
                        )
                      }
                    />

                    <span className="ml-3">
                      {option}
                    </span>
                  </label>
                )
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                disabled={
                  currentQuestion === 0
                }
                onClick={() =>
                  setCurrentQuestion(
                    currentQuestion - 1
                  )
                }
                className="px-5 py-2 bg-gray-200 rounded-lg"
              >
                Previous
              </button>

              {currentQuestion ===
              questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={() =>
                    setCurrentQuestion(
                      currentQuestion + 1
                    )
                  }
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="font-semibold mb-4">
              Question Navigator
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => (
                <button
                  key={q._id}
                  onClick={() =>
                    setCurrentQuestion(index)
                  }
                  className={`h-10 rounded-lg text-sm font-medium ${
                    selectedAnswers[q._id]
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-6 text-sm">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                Answered
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                Not Answered
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttemptTest;