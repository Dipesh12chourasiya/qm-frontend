import api from "./axios";

// CREATE QUESTION (COMPANY ONLY)
export const createQuestionApi = async (data) => {
  const response = await api.post("/api/questions", data);
  return response.data;
};

// GET MY QUESTIONS (COMPANY ONLY)
export const getMyQuestionsApi = async () => {
  const response = await api.get("/api/questions/my");
  return response.data;
};

// GET QUESTION BY ID
export const getQuestionByIdApi = async (id) => {
  const response = await api.get(`/api/questions/${id}`);
  return response.data;
};

// UPDATE QUESTION
export const updateQuestionApi = async (id, data) => {
  const response = await api.put(`/api/questions/${id}`, data);
  return response.data;
};

// DELETE QUESTION
export const deleteQuestionApi = async (id) => {
  const response = await api.delete(`/api/questions/${id}`);
  return response.data;
};