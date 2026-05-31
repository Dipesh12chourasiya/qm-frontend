import axiosInstance from "./axios";

export const startTestApi = async (testId) => {
  const response = await axiosInstance.post(
    `/api/attempts/start/${testId}`
  );

  return response.data;
};

export const saveAnswerApi = async (data) => {
  const response = await axiosInstance.post(
    "/api/attempts/answer",
    data
  );

  return response.data;
};

export const submitTestApi = async (attemptId) => {
  const response = await axiosInstance.post(
    `/api/attempts/submit/${attemptId}`
  );

  return response.data;
};

export const getMyAttemptsApi = async () => {
  const response = await axiosInstance.get(
    "/api/attempts/my"
  );

  return response.data;
};