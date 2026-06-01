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

export const activateTestApi = async (id) => {
  const response = await api.patch(`/api/tests/${id}/activate`);
  return response.data;
};

//  COMPLETE TEST (NEW)
export const completeTestApi = async (id) => {
  const response = await api.patch(`/api/tests/${id}/complete`);
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
  const response = await api.post(`/api/tests/${id}/register`);
  return response.data;
};

// export const getTestAnalyticsApi = async (testId) => {
//   const response = await api.get(`/tests/${testId}/analytics`);

//   return response.data;
// };

export const getTestAnalyticsApi = async (
  testId
) => {
  console.log(
    "Calling analytics API:",
    testId
  );

  const response = await api.get(
    `/api/tests/${testId}/analytics`
    // api/tests/6a1beca7ca5446859ed1f45b/analytics
  );

  console.log(
    "Analytics API Response:",
    response.data
  );

  return response.data;
};