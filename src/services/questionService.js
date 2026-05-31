import {
  createQuestionApi,
  getMyQuestionsApi,
  getQuestionByIdApi,
  updateQuestionApi,
  deleteQuestionApi,
} from "../api/questionApi";

const questionService = {
  createQuestion: (data) => createQuestionApi(data),

  getMyQuestions: () => getMyQuestionsApi(),

  getQuestionById: (id) => getQuestionByIdApi(id),

  updateQuestion: (id, data) => updateQuestionApi(id, data),

  deleteQuestion: (id) => deleteQuestionApi(id),
};

export default questionService;