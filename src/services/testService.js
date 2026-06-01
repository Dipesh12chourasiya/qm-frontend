import {
  createTestApi,
  getAllTestsApi,
  getMyTestsApi,
  getTestByIdApi,
  registerForTestApi,
  activateTestApi,
  completeTestApi,
  getTestAnalyticsApi
} from "../api/testApi";

// COMPANY
export const createTest = async (data) => {
  return await createTestApi(data);
};

export const getMyTests = async () => {
  return await getMyTestsApi();
};

export const activateTest = async (id) => {
  return await activateTestApi(id);
};

//  COMPLETE TEST
export const completeTest = async (id) => {
  return await completeTestApi(id);
};


// USER
export const getAllTests = async () => {
  return await getAllTestsApi();
};

export const getTestById = async (id) => {
  return await getTestByIdApi(id);
};

export const registerForTest = async (id) => {
  return await registerForTestApi(id);
};

export const getTestAnalytics = async (
  testId
) => {
  return await getTestAnalyticsApi(testId);
};