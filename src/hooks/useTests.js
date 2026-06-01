import { useState } from "react";
import * as testService from "../services/testService";

export const useTests = () => {
  const [loading, setLoading] = useState(false);

  const [tests, setTests] = useState([]);
  const [test, setTest] = useState(null);

  const [analytics, setAnalytics] = useState(null);

  // CREATE TEST
  const createTest = async (data) => {
    try {
      setLoading(true);
      const response = await testService.createTest(data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // GET ALL TESTS (ADMIN / COMPANY)
  const getAllTests = async () => {
    try {
      setLoading(true);
      const response = await testService.getAllTests();
      setTests(response.tests || []);
      return response;
    } catch (error) {
      console.error(error);
      setTests([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // GET AVAILABLE TESTS (STUDENT)
  const getAvailableTests = async () => {
    try {
      setLoading(true);
      const response = await testService.getAllTests();
      setTests(response.tests || []);
      return response;
    } catch (error) {
      console.error(error);
      setTests([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // MY TESTS (COMPANY)
  const getMyTests = async () => {
    try {
      setLoading(true);
      const response = await testService.getMyTests();
      setTests(response.tests || []);
      return response;
    } catch (error) {
      console.error(error);
      setTests([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // SINGLE TEST
  const getTestById = async (id) => {
    try {
      setLoading(true);
      const response = await testService.getTestById(id);
      setTest(response.test || null);
      return response;
    } catch (error) {
      console.error(error);
      setTest(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const registerForTest = async (id) => {
    try {
      setLoading(true);
      const response = await testService.registerForTest(id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ACTIVATE TEST
  const activateTest = async (id) => {
    try {
      setLoading(true);
      const response = await testService.activateTest(id);

      // optional UI sync update
      setTests((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: "ACTIVE" } : t)),
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // COMPLETE TEST
  const completeTest = async (id) => {
    try {
      setLoading(true);
      const response = await testService.completeTest(id);

      // UI sync update
      setTests((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: "COMPLETED" } : t)),
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchTestAnalytics = async (testId) => {
    try {
      setLoading(true);

      const data = await testService.getTestAnalytics(testId);
      console.log("Analytics Response:", data);


      setAnalytics(data);

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    tests,
    test,

    createTest,

    getAllTests,
    getAvailableTests,
    getMyTests,
    getTestById,

    registerForTest,

    activateTest,
    completeTest, // new

    analytics,
    fetchTestAnalytics,
  };
};
