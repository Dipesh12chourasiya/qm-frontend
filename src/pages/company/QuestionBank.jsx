import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import QuestionTable from "../../components/question/QuestionTable";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import { useQuestions } from "../../hooks/useQuestions";
import Loader from "../../components/common/Loader";

const QuestionBank = () => {
  const navigate = useNavigate();

  const {
    questions,
    fetchMyQuestions,
    deleteQuestion,
    loading,
  } = useQuestions();

  useEffect(() => {
    fetchMyQuestions();
  }, []);

  const handleEdit = (question) => {
    navigate(
      `/company/questions/edit/${question._id}`
    );
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmed) return;

    try {
      await deleteQuestion(id);

      // refresh table
      fetchMyQuestions();
    } catch (error) {
      console.error(error);
      alert("Failed to delete question");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Question Bank"
        subtitle="Manage all assessment questions."
      />

      <div className="flex justify-end">
        <Link to="/company/questions/create">
          <Button>Add Question</Button>
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <QuestionTable
          questions={questions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default QuestionBank;