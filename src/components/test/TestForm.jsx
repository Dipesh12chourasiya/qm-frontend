import React, { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

const TestForm = ({
  initialData = null,
  questions = [],
  onSubmit,
  loading = false,
}) => {
  const [selectedQuestions, setSelectedQuestions] = useState(
    initialData?.questionIds || [],
  );

  const [formData, setFormData] = useState({
    title: initialData?.title || "",

    description: initialData?.description || "",

    duration: initialData?.duration || 30,

    passingMarks: initialData?.passingMarks || 0,

    status: initialData?.status || "ACTIVE",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleQuestion = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      questionIds: selectedQuestions,
    });
  };

  // console.log("Questions:", questions);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-neutral-200 rounded-3xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold">
        {initialData ? "Edit Test" : "Create Test"}
      </h2>

      <Input
        label="Test Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <div>
        <label className="font-medium">Description</label>

        <textarea
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mt-2 border border-neutral-300 rounded-xl p-4 outline-none focus:border-black"
        />
      </div>

      <Input
        label="Duration (Minutes)"
        type="number"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        required
      />

      <Input
        label="Passing Marks"
        type="number"
        name="passingMarks"
        value={formData.passingMarks}
        onChange={handleChange}
        required
      />

      <div>
        <label className="font-medium block mb-3">Select Questions</label>

        <div className="border border-neutral-300 rounded-xl max-h-80 overflow-y-auto">
          {questions.map((q) => (
            <label
              key={q._id}
              className="flex items-start gap-3 p-4 border-b border-neutral-200 cursor-pointer hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedQuestions.includes(q._id)}
                onChange={() => toggleQuestion(q._id)}
              />

              <div className="flex-1">
                <p className="font-medium text-black">{q.questionText}</p>

                <div className="text-sm text-neutral-500 mt-1">
                  {q.category} • {q.difficulty} • {q.marks} mark(s)
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <Button type="submit" loading={loading} className="w-full">
        {initialData ? "Update Test" : "Create Test"}
      </Button>
    </form>
  );
};

export default TestForm;
