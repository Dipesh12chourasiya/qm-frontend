import React from "react";

import PageHeader from "../../components/common/PageHeader";
import TestTable from "../../components/test/TestTable";

const MyTests = () => {
  const tests = [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Tests"
        subtitle="View and manage all tests."
      />

      <TestTable tests={tests} />
    </div>
  );
};

export default MyTests;