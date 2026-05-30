import React from "react";
import { Link } from "react-router-dom";

import QuestionTable from "../../components/question/QuestionTable";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";

const QuestionBank = () => {
  const questions = [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Question Bank"
        subtitle="Manage all assessment questions."
      />

      <div className="flex justify-end">
        <Link to="/company/questions/create">
          <Button>
            Add Question
          </Button>
        </Link>
      </div>

      <QuestionTable
        questions={questions}
      />
    </div>
  );
};

export default QuestionBank;