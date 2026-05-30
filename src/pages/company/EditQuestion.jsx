import React from "react";

import QuestionForm from "../../components/question/QuestionForm";
import PageHeader from "../../components/common/PageHeader";

const EditQuestion = () => {
  const question = {
    question:
      "What is React?",
    options: [
      "Library",
      "Framework",
      "Language",
      "Compiler",
    ],
    correctAnswer:
      "Library",
    category: "React",
    difficulty: "Easy",
    marks: 1,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Question"
        subtitle="Update question details."
      />

      <QuestionForm
        initialData={question}
      />
    </div>
  );
};

export default EditQuestion;