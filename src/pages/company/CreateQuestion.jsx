import React from "react";
import { useNavigate } from "react-router-dom";

import QuestionForm from "../../components/question/QuestionForm";
import PageHeader from "../../components/common/PageHeader";
import { useQuestions } from "../../hooks/useQuestions";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const { createQuestion, loading } = useQuestions();

  const handleSubmit = async (data) => {
    try {
      await createQuestion(data);
      alert("Question Created");
      navigate("/company/questions");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Question"
        subtitle="Add a new question to your question bank."
      />

      <QuestionForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default CreateQuestion;