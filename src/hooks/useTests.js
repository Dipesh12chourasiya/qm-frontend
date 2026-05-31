// import { useState } from "react";

// import * as testService from "../services/testService";

// export const useTests = () => {
//   const [loading, setLoading] = useState(false);

//   const createTest = async (data) => {
//     try {
//       setLoading(true);

//       return await testService.createTest(data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getAllTests = async () => {
//     try {
//       setLoading(true);

//       return await testService.getAllTests();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getMyTests = async () => {
//     try {
//       setLoading(true);

//       return await testService.getMyTests();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTestById = async (id) => {
//     try {
//       setLoading(true);

//       return await testService.getTestById(id);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const registerForTest = async (id) => {
//     try {
//       setLoading(true);

//       return await testService.registerForTest(id);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     createTest,
//     getAllTests,
//     getMyTests,
//     getTestById,
//     registerForTest,
//   };
// };

import { useState } from "react";

import * as testService from "../services/testService";

export const useTests = () => {
  const [loading, setLoading] = useState(false);

  const [tests, setTests] = useState([]);

  const [test, setTest] = useState(null);

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

  const activateTest = async (id) => {
    try {
      setLoading(true);

      return await testService.activateTest(id);
    } finally {
      setLoading(false);
    }
  };

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
  };
};
