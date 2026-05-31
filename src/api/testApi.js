import api from "./axios";

// COMPANY

export const createTestApi = async (data) => {
  const response = await api.post("/api/tests", data);
  return response.data;
};

export const getMyTestsApi = async () => {
  const response = await api.get("/api/tests/my");
  return response.data;
};

// USER

export const getAllTestsApi = async () => {
  const response = await api.get("/api/tests");
  return response.data;
};

export const getTestByIdApi = async (id) => {
  const response = await api.get(`/api/tests/${id}`);
  return response.data;
};

export const registerForTestApi = async (id) => {
  const response = await api.post(
    `/api/tests/${id}/register`
  );

  return response.data;
};