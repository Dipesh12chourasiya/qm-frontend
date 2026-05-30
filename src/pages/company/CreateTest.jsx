import React from "react";

import TestForm from "../../components/test/TestForm";
import PageHeader from "../../components/common/PageHeader";

const CreateTest = () => {
  const questions = [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Test"
        subtitle="Create a new assessment."
      />

      <TestForm
        questions={questions}
      />
    </div>
  );
};

export default CreateTest;