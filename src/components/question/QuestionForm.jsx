import React, { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

const QuestionForm = ({
  initialData = null,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] =
    useState({
      question:
        initialData?.question || "",

      option1:
        initialData?.options?.[0] ||
        "",

      option2:
        initialData?.options?.[1] ||
        "",

      option3:
        initialData?.options?.[2] ||
        "",

      option4:
        initialData?.options?.[3] ||
        "",

      correctAnswer:
        initialData?.correctAnswer ||
        "",

      category:
        initialData?.category || "",

      difficulty:
        initialData?.difficulty ||
        "Easy",

      marks:
        initialData?.marks || 1,
    });

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
      question:
        formData.question,

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
    });
  };

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
          name="question"
          rows="4"
          value={
            formData.question
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

      <Input
        label="Category"
        name="category"
        value={
          formData.category
        }
        onChange={
          handleChange
        }
        placeholder="Java, React, DBMS..."
        required
      />

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
          <option>
            Easy
          </option>
          <option>
            Medium
          </option>
          <option>
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