import {
  createTestApi,
  getAllTestsApi,
  getMyTestsApi,
  getTestByIdApi,
  registerForTestApi,
} from "../api/testApi";

export const createTest = async (data) => {
  return await createTestApi(data);
};

export const getAllTests = async () => {
  return await getAllTestsApi();
};

export const getMyTests = async () => {
  return await getMyTestsApi();
};

export const getTestById = async (id) => {
  return await getTestByIdApi(id);
};

export const registerForTest = async (id) => {
  return await registerForTestApi(id);
};