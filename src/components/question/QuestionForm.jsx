import React, { useState, useEffect } from "react";

import Input from "../common/Input";
import Button from "../common/Button";
import Loader from "../common/Loader";

const QuestionForm = ({
  initialData = null,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    category: "Technical",
    difficulty: "Easy",
    marks: 1,
    explanation: "",
  });

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      questionText:
        initialData.questionText || "",

      option1:
        initialData.options?.[0] || "",

      option2:
        initialData.options?.[1] || "",

      option3:
        initialData.options?.[2] || "",

      option4:
        initialData.options?.[3] || "",

      correctAnswer:
        initialData.correctAnswer || "",

      category:
        initialData.category || "Technical",

      difficulty:
        initialData.difficulty || "Easy",

      marks:
        initialData.marks || 1,

      explanation:
        initialData.explanation || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      questionText:
        formData.questionText,

      options: [
        formData.option1,
        formData.option2,
        formData.option3,
        formData.option4,
      ],

      correctAnswer:
        formData.correctAnswer,

      category:
        formData.category,

      difficulty:
        formData.difficulty,

      marks: Number(
        formData.marks
      ),

      explanation:
        formData.explanation,
    });
  };

  // Show loader while editing and data hasn't arrived yet
  if (loading && !initialData) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-neutral-200 rounded-3xl p-8 space-y-5"
    >
      <h2 className="text-2xl font-bold">
        {initialData
          ? "Edit Question"
          : "Create Question"}
      </h2>

      <div>
        <label className="font-medium">
          Question
        </label>

        <textarea
          name="questionText"
          rows="4"
          value={
            formData.questionText
          }
          onChange={
            handleChange
          }
          className="w-full mt-2 border border-neutral-300 rounded-xl p-4 outline-none focus:border-black"
          required
        />
      </div>

      <Input
        label="Option 1"
        name="option1"
        value={
          formData.option1
        }
        onChange={
          handleChange
        }
        required
      />

      <Input
        label="Option 2"
        name="option2"
        value={
          formData.option2
        }
        onChange={
          handleChange
        }
        required
      />

      <Input
        label="Option 3"
        name="option3"
        value={
          formData.option3
        }
        onChange={
          handleChange
        }
        required
      />

      <Input
        label="Option 4"
        name="option4"
        value={
          formData.option4
        }
        onChange={
          handleChange
        }
        required
      />

      <Input
        label="Correct Answer"
        name="correctAnswer"
        value={
          formData.correctAnswer
        }
        onChange={
          handleChange
        }
        placeholder="Must match one option exactly"
        required
      />

      <div>
        <label className="block mb-2 font-medium">
          Category
        </label>

        <select
          name="category"
          value={
            formData.category
          }
          onChange={
            handleChange
          }
          className="w-full border border-neutral-300 rounded-xl p-3"
        >
          <option value="Aptitude">
            Aptitude
          </option>

          <option value="Reasoning">
            Reasoning
          </option>

          <option value="Verbal">
            Verbal
          </option>

          <option value="Technical">
            Technical
          </option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Difficulty
        </label>

        <select
          name="difficulty"
          value={
            formData.difficulty
          }
          onChange={
            handleChange
          }
          className="w-full border border-neutral-300 rounded-xl p-3"
        >
          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>
        </select>
      </div>

      <Input
        label="Marks"
        type="number"
        name="marks"
        value={
          formData.marks
        }
        onChange={
          handleChange
        }
        required
      />

      <div>
        <label className="font-medium">
          Explanation
        </label>

        <textarea
          name="explanation"
          rows="3"
          value={
            formData.explanation
          }
          onChange={
            handleChange
          }
          className="w-full mt-2 border border-neutral-300 rounded-xl p-4 outline-none focus:border-black"
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        {initialData
          ? "Update Question"
          : "Create Question"}
      </Button>
    </form>
  );
};

export default QuestionForm;