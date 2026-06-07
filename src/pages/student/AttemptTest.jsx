import React, { useEffect, useState } from "react";
import { useMemo } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";

import { useRef } from "react";
import { useProctoring } from "../../context/ProctoringContext";

import TabSwitchMonitor from "../../components/proctoring/TabSwitchMonitor";
import FullscreenMonitor from "../../components/proctoring/FullscreenMonitor";
import InternetStatus from "../../components/proctoring/InternetStatus";
import CameraMonitor from "../../components/proctoring/CameraMonitor";
import ViolationCounter from "../../components/proctoring/ViolationCounter";
import AudioMonitor from "../../components/proctoring/AudioMonitor";

import { useAttempts } from "../../hooks/useAttempts";

const AttemptTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const { testTerminated, violations } = useProctoring();
  const submittingRef = useRef(false);

  const { loading, startTest, saveAnswer, submitTest, attempt, questions } =
    useAttempts();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [warningPopup, setWarningPopup] = useState(null);

  const lastViolation =
    violations.length > 0 ? violations[violations.length - 1] : null;

  const startedRef =
  useRef(false);

useEffect(() => {
  if (
    !testId ||
    startedRef.current
  )
    return;

  startedRef.current = true;

  startTest(testId);
}, [testId]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const prevent = (e) => e.preventDefault();

    document.addEventListener("copy", prevent);

    document.addEventListener("paste", prevent);

    document.addEventListener("cut", prevent);

    document.addEventListener("contextmenu", prevent);

    return () => {
      document.removeEventListener("copy", prevent);

      document.removeEventListener("paste", prevent);

      document.removeEventListener("cut", prevent);

      document.removeEventListener("contextmenu", prevent);
    };
  }, []);

  useEffect(() => {
    if (!lastViolation) return;

    setWarningPopup({
      type: lastViolation.type,
      count: violations.length,
    });

    const timer = setTimeout(() => {
      setWarningPopup(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [lastViolation, violations.length]);

  const stopCamera = () => {
    const videos = document.querySelectorAll("video");

    videos.forEach((video) => {
      const stream = video.srcObject;

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());

        video.srcObject = null;
      }
    });
  };

  const handleOptionSelect = async (questionId, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));

    if (!attempt?._id) return;

    try {
      await saveAnswer(attempt._id, questionId, option);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!attempt?._id) return;

    if (submittingRef.current) return;

    try {
      submittingRef.current = true;

      stopCamera();

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      const response = await submitTest(attempt._id);

      navigate("/student/result", {
        state: response?.result,
        replace: true,
      });
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  useEffect(() => {
    if (!testTerminated) return;

    alert("Maximum violations reached. Test will be submitted.");

    handleSubmit();
  }, [testTerminated]);

  useEffect(() => {
    if (!attempt?.answers) return;

    const restored = {};

    attempt.answers.forEach((answer) => {
      restored[answer.questionId] = answer.selectedOption;
    });

    setSelectedAnswers(restored);
  }, [attempt]);

   console.log(
  "Violations:",
  violations
);

  const question = questions?.[currentQuestion];

  if (loading || !attempt || !questions?.length || !question) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      {/* Proctoring */}
      <TabSwitchMonitor />
      <FullscreenMonitor />
      <InternetStatus />
      <CameraMonitor />
      <AudioMonitor />
      <ViolationCounter />

      <PageHeader
        title="Assessment"
        subtitle="Answer all questions carefully"
      />

      {warningPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
          <div className="bg-white rounded-xl p-6 w-[420px] shadow-xl">
            <h2 className="text-xl font-bold text-red-600 mb-3">Warning</h2>

            <p className="mb-2">Violation Detected:</p>

            <p className="font-semibold">{warningPopup.type}</p>

            <p className="mt-3 text-sm text-gray-600">
              Warning Count: {warningPopup.count}
            </p>

            <p className="text-sm text-gray-600">
              Please follow the exam rules.
            </p>

            <button
              onClick={() => setWarningPopup(null)}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Questions */}
        <div className="col-span-9">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} / {questions.length}
              </span>
            </div>

            <h2 className="text-xl font-semibold mb-6">
              {question.questionText}
            </h2>

            <div className="space-y-4">
              {question.options?.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name={question._id}
                    checked={selectedAnswers[question._id] === option}
                    onChange={() => handleOptionSelect(question._id, option)}
                  />

                  <span className="ml-3">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion((prev) => prev - 1)}
                className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion((prev) => prev + 1)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigator */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="font-semibold mb-4">Question Navigator</h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`h-10 rounded-lg text-sm font-medium ${
                    selectedAnswers[q._id]
                      ? "bg-green-500 text-white"
                      : index === currentQuestion
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-6 text-sm">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                Answered
              </div>

              <div className="flex items-center mb-2">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                Current
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                Not Answered
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                End Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttemptTest;
