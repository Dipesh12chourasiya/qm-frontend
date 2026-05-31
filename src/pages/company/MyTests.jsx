import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import TestTable from "../../components/test/TestTable";

import { useTests } from "../../hooks/useTests";

const MyTests = () => {
  const { getMyTests } =
    useTests();

  const navigate =
    useNavigate();

  const [tests, setTests] =
    useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res =
        await getMyTests();

      setTests(res.tests || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (
    test
  ) => {
    navigate(
      `/company/tests/${test._id}`
    );
  };

  const handleEdit = (
    test
  ) => {
    navigate(
      `/company/tests/edit/${test._id}`
    );
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
        onEdit={handleEdit}
      />
    </div>
  );
};

export default MyTests;