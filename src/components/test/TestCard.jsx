import React, { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

const TestForm = ({
  initialData = null,
  questions = [],
  onSubmit,
  loading = false,
}) => {
  const [selectedQuestions, setSelectedQuestions] =
    useState(
      initialData?.questionIds || []
    );

  const [formData, setFormData] =
    useState({
      title:
        initialData?.title || "",

      description:
        initialData?.description || "",

      duration:
        initialData?.duration || 30,

      status:
        initialData?.status ||
        "ACTIVE",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const toggleQuestion = (id) => {
    if (
      selectedQuestions.includes(id)
    ) {
      setSelectedQuestions(
        selectedQuestions.filter(
          (q) => q !== id
        )
      );
    } else {
      setSelectedQuestions([
        ...selectedQuestions,
        id,
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      selectedQuestions.length === 0
    ) {
      alert(
        "Please select at least one question"
      );
      return;
    }

    onSubmit({
      ...formData,
      questionIds:
        selectedQuestions,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-neutral-200 rounded-3xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold">
        {initialData
          ? "Edit Test"
          : "Create Test"}
      </h2>

      <Input
        label="Test Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <div>
        <label className="font-medium">
          Description
        </label>

        <textarea
          rows={4}
          name="description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          className="w-full mt-2 border border-neutral-300 rounded-xl p-4 outline-none focus:border-black"
        />
      </div>

      <Input
        label="Duration (Minutes)"
        type="number"
        name="duration"
        value={
          formData.duration
        }
        onChange={
          handleChange
        }
        required
      />

      <div>
        <label className="font-medium block mb-3">
          Select Questions (
          {
            selectedQuestions.length
          }{" "}
          selected)
        </label>

        <div className="border border-neutral-300 rounded-xl max-h-80 overflow-y-auto">
          {questions.length ===
          0 ? (
            <p className="p-4 text-neutral-500">
              No questions found
            </p>
          ) : (
            questions.map((q) => (
              <label
                key={q._id}
                className="flex items-start gap-3 p-4 border-b border-neutral-200 cursor-pointer hover:bg-neutral-50"
              >
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(
                    q._id
                  )}
                  onChange={() =>
                    toggleQuestion(
                      q._id
                    )
                  }
                  className="mt-1"
                />

                <div className="flex-1">
                  <p className="font-medium">
                    {
                      q.questionText
                    }
                  </p>

                  <div className="flex gap-3 mt-1 text-sm text-neutral-500">
                    <span>
                      {
                        q.category
                      }
                    </span>

                    <span>
                      {
                        q.difficulty
                      }
                    </span>

                    <span>
                      {q.marks}{" "}
                      Mark
                      {q.marks >
                      1
                        ? "s"
                        : ""}
                    </span>
                  </div>
                </div>
              </label>
            ))
          )}
        </div>
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        {initialData
          ? "Update Test"
          : "Create Test"}
      </Button>
    </form>
  );
};

export default TestForm;