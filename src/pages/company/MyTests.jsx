import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import TestTable from "../../components/test/TestTable";

import { useTests } from "../../hooks/useTests";

const MyTests = () => {
  const {
    tests,
    getMyTests,
    activateTest,
    completeTest, // 🔥 NEW
  } = useTests();

  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      await getMyTests();
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (test) => {
    navigate(`/company/tests/${test._id}`);
  };

  const handleActivate = async (test) => {
    try {
      await activateTest(test._id);
      alert("Test activated successfully");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to activate test");
    }
  };

  // 🔥 NEW: complete handler
  const handleComplete = async (test) => {
    try {
      await completeTest(test._id);
      alert("Test completed successfully");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to complete test");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Tests"
        subtitle="View and manage all tests."
      />

      <TestTable
        tests={tests}
        onView={handleView}
        onActivate={handleActivate}
        onComplete={handleComplete} //  NEW
      />
    </div>
  );
};

export default MyTests;