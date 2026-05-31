import { useState } from "react";

import * as testService from "../services/testService";

export const useTests = () => {
  const [loading, setLoading] = useState(false);

  const createTest = async (data) => {
    try {
      setLoading(true);

      return await testService.createTest(data);
    } finally {
      setLoading(false);
    }
  };

  const getAllTests = async () => {
    try {
      setLoading(true);

      return await testService.getAllTests();
    } finally {
      setLoading(false);
    }
  };

  const getMyTests = async () => {
    try {
      setLoading(true);

      return await testService.getMyTests();
    } finally {
      setLoading(false);
    }
  };

  const getTestById = async (id) => {
    try {
      setLoading(true);

      return await testService.getTestById(id);
    } finally {
      setLoading(false);
    }
  };

  const registerForTest = async (id) => {
    try {
      setLoading(true);

      return await testService.registerForTest(id);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createTest,
    getAllTests,
    getMyTests,
    getTestById,
    registerForTest,
  };
};