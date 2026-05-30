import React from "react";

import QuestionForm from "../../components/question/QuestionForm";
import PageHeader from "../../components/common/PageHeader";

const CreateQuestion = () => {
  const handleSubmit = (
    data
  ) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Question"
        subtitle="Add a new question to your question bank."
      />

      <QuestionForm
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateQuestion;