import {
  startTestApi,
  saveAnswerApi,
  submitTestApi,
  getMyAttemptsApi,
} from "../api/attemptApi";

export const startTestService = (testId) =>
  startTestApi(testId);

export const saveAnswerService = (data) =>
  saveAnswerApi(data);

export const submitTestService = (attemptId) =>
  submitTestApi(attemptId);

export const getMyAttemptsService = () =>
  getMyAttemptsApi();