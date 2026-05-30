import React from "react";

const AttemptQuestion = ({
  question,
  selectedAnswer,
  onAnswerChange,
}) => {
  if (!question) return null;

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-8">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">
          {question.question}
        </h2>
      </div>

      <div className="space-y-4">
        {question.options.map(
          (option, index) => (
            <label
              key={index}
              className={`
                flex items-center gap-3
                p-4
                rounded-xl
                border
                cursor-pointer
                transition

                ${
                  selectedAnswer ===
                  option
                    ? "border-black bg-neutral-100"
                    : "border-neutral-200"
                }
              `}
            >
              <input
                type="radio"
                name={
                  question._id
                }
                value={option}
                checked={
                  selectedAnswer ===
                  option
                }
                onChange={() =>
                  onAnswerChange(
                    question._id,
                    option
                  )
                }
              />

              <span>{option}</span>
            </label>
          )
        )}
      </div>
    </div>
  );
};

export default AttemptQuestion;