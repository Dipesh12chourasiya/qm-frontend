import React, { useEffect, useState } from "react";

import TestForm from "../../components/test/TestForm";
import PageHeader from "../../components/common/PageHeader";

import { useTests } from "../../hooks/useTests";
import { useQuestions } from "../../hooks/useQuestions";

const CreateTest = () => {
  const { createTest } = useTests();

  const { fetchMyQuestions } = useQuestions();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const questionsData = await fetchMyQuestions();

      setQuestions(questionsData || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTest = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        duration: Number(formData.duration),

        questionIds: formData.questionIds,

        maxAttempts: 1,

        startTime: new Date(),

        endTime: new Date(Date.now() + Number(formData.duration) * 60 * 1000),
      };

      const res = await createTest(payload);

      alert(res.message || "Test created successfully");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to create test");
    }
  };

  // console.log(
  //   "Questions State:",
  //   questions
  // );

  return (
    <div className="space-y-6">
      <PageHeader title="Create Test" subtitle="Create a new assessment." />

      <TestForm questions={questions} onSubmit={handleCreateTest} />
    </div>
  );
};

export default CreateTest;
