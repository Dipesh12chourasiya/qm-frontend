import React from "react";

const QuestionNavigator = ({
  questions = [],
  currentQuestion,
  answers = {},
  onNavigate,
}) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5">
      <h3 className="font-semibold mb-4">
        Questions
      </h3>

      <div className="grid grid-cols-5 gap-3">
        {questions.map(
          (question, index) => {
            const answered =
              answers[
                question._id
              ];

            return (
              <button
                key={
                  question._id
                }
                onClick={() =>
                  onNavigate(
                    index
                  )
                }
                className={`
                  w-10 h-10 rounded-lg font-medium transition
                  
                  ${
                    currentQuestion ===
                    index
                      ? "bg-black text-white"
                      : answered
                      ? "bg-green-100 text-green-700"
                      : "bg-neutral-100"
                  }
                `}
              >
                {index + 1}
              </button>
            );
          }
        )}
      </div>

      <div className="mt-5 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black rounded" />
          Current
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 rounded" />
          Answered
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-neutral-100 rounded" />
          Unanswered
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigator;