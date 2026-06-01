import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

const SystemCheck = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraReady, setCameraReady] =
    useState(false);

  const [micReady, setMicReady] =
    useState(false);

  const [fullscreenReady, setFullscreenReady] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    initializeDevices();

    const handleFullscreenChange = () => {
      setFullscreenReady(
        !!document.fullscreenElement
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );

      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) =>
          track.stop()
        );

      streamRef.current = null;
    }
  };

  const initializeDevices =
    async () => {
      try {
        setLoading(true);

        const mediaStream =
          await navigator.mediaDevices.getUserMedia(
            {
              video: true,
              audio: true,
            }
          );

        streamRef.current =
          mediaStream;

        if (videoRef.current) {
          videoRef.current.srcObject =
            mediaStream;
        }

        setCameraReady(true);
        setMicReady(true);
        setError("");
      } catch (err) {
        console.error(err);

        setCameraReady(false);
        setMicReady(false);

        setError(
          "Camera or microphone permission denied."
        );
      } finally {
        setLoading(false);
      }
    };

  const enableFullscreen =
    async () => {
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.error(err);

        alert(
          "Fullscreen permission denied."
        );
      }
    };

  const handleStartTest =
    async () => {
      if (
        !cameraReady ||
        !micReady ||
        !fullscreenReady
      ) {
        alert(
          "Please complete all system checks before starting the test."
        );
        return;
      }

      stopCamera();

      navigate(
        `/student/tests/${testId}/attempt`
      );
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl p-8">
        <h1 className="text-3xl font-bold mb-2">
          System Check
        </h1>

        <p className="text-gray-600 mb-8">
          Verify your camera,
          microphone, and fullscreen
          access before starting the
          assessment.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Camera Preview */}
          <div>
            <div className="border rounded-xl overflow-hidden">
              {loading ? (
                <div className="h-[320px] flex items-center justify-center">
                  Loading Camera...
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-[320px] object-cover"
                />
              )}
            </div>
          </div>

          {/* Checks */}
          <div className="space-y-4">
            <div className="border rounded-xl p-4">
              <div className="font-medium">
                Camera Status
              </div>

              <div className="mt-2">
                {cameraReady
                  ? "✅ Camera Working"
                  : "❌ Camera Not Available"}
              </div>
            </div>

            <div className="border rounded-xl p-4">
              <div className="font-medium">
                Microphone Status
              </div>

              <div className="mt-2">
                {micReady
                  ? "✅ Microphone Working"
                  : "❌ Microphone Not Available"}
              </div>
            </div>

            <div className="border rounded-xl p-4">
              <div className="font-medium">
                Fullscreen Status
              </div>

              <div className="mt-2">
                {fullscreenReady
                  ? "✅ Enabled"
                  : "❌ Not Enabled"}
              </div>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={
                enableFullscreen
              }
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Enable Fullscreen
            </button>

            <button
              onClick={
                handleStartTest
              }
              disabled={
                !cameraReady ||
                !micReady ||
                !fullscreenReady
              }
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Start Test
            </button>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="font-semibold mb-3">
            Instructions
          </h3>

          <ul className="list-disc ml-5 space-y-2 text-gray-600">
            <li>
              Keep your camera enabled
              throughout the exam.
            </li>

            <li>
              Do not switch browser
              tabs.
            </li>

            <li>
              Do not exit fullscreen
              mode.
            </li>

            <li>
              Ensure a stable internet
              connection.
            </li>

            <li>
              Violations may be
              recorded during the
              assessment.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemCheck;