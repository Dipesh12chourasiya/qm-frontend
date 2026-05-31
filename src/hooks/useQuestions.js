import { useState, useEffect } from "react";
import questionService from "../services/questionService";

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
   * GET ALL MY QUESTIONS
   */
  const fetchMyQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await questionService.getMyQuestions();

      setQuestions(res.questions);
      return res.questions;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  /*
   * GET SINGLE QUESTION
   */
  const fetchQuestionById = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const res = await questionService.getQuestionById(id);

      setQuestion(res.question);
      return res.question;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  /*
   * CREATE QUESTION
   */
  const createQuestion = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await questionService.createQuestion(data);

      setQuestions((prev) => [res.question, ...prev]);

      return res.question;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /*
   * UPDATE QUESTION
   */
  const updateQuestion = async (id, data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await questionService.updateQuestion(id, data);

      setQuestions((prev) =>
        prev.map((q) =>
          q._id === id ? res.question : q
        )
      );

      return res.question;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /*
   * DELETE QUESTION
   */
  const deleteQuestion = async (id) => {
    try {
      setLoading(true);
      setError(null);

      await questionService.deleteQuestion(id);

      setQuestions((prev) =>
        prev.filter((q) => q._id !== id)
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    // state
    questions,
    question,
    loading,
    error,

    // actions
    fetchMyQuestions,
    fetchQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,

    // setters (optional)
    setQuestions,
    setQuestion,
  };
};