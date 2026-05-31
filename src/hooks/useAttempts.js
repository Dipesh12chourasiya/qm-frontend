import { useState } from "react";

import {
  startTestService,
  saveAnswerService,
  submitTestService,
  getMyAttemptsService,
} from "../services/attemptService";

export const useAttempts = () => {
  const [loading, setLoading] =
    useState(false);

  const [attempt, setAttempt] =
    useState(null);

  const [questions, setQuestions] =
    useState([]);

  const [attempts, setAttempts] =
    useState([]);

  const [result, setResult] =
    useState(null);

  const startTest = async (testId) => {
    try {
      setLoading(true);

      const data =
        await startTestService(testId);

      setAttempt(data.attempt);

      setQuestions(data.questions);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const saveAnswer = async (
    attemptId,
    questionId,
    selectedOption
  ) => {
    return await saveAnswerService({
      attemptId,
      questionId,
      selectedOption,
    });
  };

  const submitTest = async (
    attemptId
  ) => {
    try {
      setLoading(true);

      const data =
        await submitTestService(
          attemptId
        );

      setResult(data.result);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const getMyAttempts =
    async () => {
      try {
        setLoading(true);

        const data =
          await getMyAttemptsService();

        setAttempts(data.attempts);

        return data;
      } finally {
        setLoading(false);
      }
    };

  return {
    loading,

    attempt,
    questions,
    attempts,
    result,

    startTest,
    saveAnswer,
    submitTest,
    getMyAttempts,
  };
};