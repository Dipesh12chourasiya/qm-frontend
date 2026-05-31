import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import QuestionForm from "../../components/question/QuestionForm";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import { useQuestions } from "../../hooks/useQuestions";

const EditQuestion = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    question,
    fetchQuestionById,
    updateQuestion,
    loading,
  } = useQuestions();

  useEffect(() => {
    fetchQuestionById(id);
  }, [id]);

  const handleSubmit = async (data) => {
    await updateQuestion(id, data);
    alert("Updated Successfully");
    navigate("/company/questions");
  };

  console.log(question);
  if (loading && !question) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Question"
        subtitle="Update question details."
      />

      <QuestionForm
        initialData={question}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default EditQuestion;