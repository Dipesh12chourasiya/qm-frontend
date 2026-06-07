import {
  useEffect,
  useRef,
} from "react";

import {
  FilesetResolver,
  FaceLandmarker,
} from "@mediapipe/tasks-vision";

import { useProctoring } from "../context/ProctoringContext";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task";

const useFaceDetection = (videoRef) => {
  const { addViolation } =
    useProctoring();

  const faceLandmarkerRef =
    useRef(null);

  const lastFaceSeenRef =
    useRef(Date.now());

  const lastViolationRef =
    useRef({});

  const addViolationOnce = (
    type,
    cooldown = 5000
  ) => {
    const now = Date.now();

    if (
      !lastViolationRef.current[type] ||
      now -
        lastViolationRef.current[type] >
        cooldown
    ) {
      addViolation(type);

      lastViolationRef.current[type] =
        now;
    }
  };

  useEffect(() => {
    let animationFrameId;

    const initialize =
      async () => {
        try {
          const vision =
            await FilesetResolver.forVisionTasks(
              "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );

          const faceLandmarker =
            await FaceLandmarker.createFromOptions(
              vision,
              {
                baseOptions: {
                  modelAssetPath:
                    MODEL_URL,
                },

                runningMode:
                  "VIDEO",

                numFaces: 5,

                outputFaceBlendshapes:
                  true,

                outputFacialTransformationMatrixes:
                  true,
              }
            );

          faceLandmarkerRef.current =
            faceLandmarker;

          detectFaces();
        } catch (error) {
          console.error(
            "Face detector error",
            error
          );
        }
      };

    const detectFaces = () => {
      if (
        !videoRef?.current ||
        !faceLandmarkerRef.current
      ) {
        animationFrameId =
          requestAnimationFrame(
            detectFaces
          );
        return;
      }

      const video =
        videoRef.current;

      if (
        video.readyState < 2
      ) {
        animationFrameId =
          requestAnimationFrame(
            detectFaces
          );
        return;
      }

      const result =
        faceLandmarkerRef.current.detectForVideo(
          video,
          performance.now()
        );

      const faces =
        result.faceLandmarks || [];

      /*
       * NO FACE
       */

      if (faces.length === 0) {
        const now =
          Date.now();

        if (
          now -
            lastFaceSeenRef.current >
          3000
        ) {
          addViolationOnce(
            "NO_FACE"
          );
        }
      } else {
        lastFaceSeenRef.current =
          Date.now();
      }

      /*
       * MULTIPLE FACES
       */

      if (faces.length > 1) {
        addViolationOnce(
          "MULTIPLE_FACES"
        );
      }

      /*
       * HEAD DIRECTION
       */

      if (
        result
          .facialTransformationMatrixes &&
        result
          .facialTransformationMatrixes
          .length > 0
      ) {
        const matrix =
          result
            .facialTransformationMatrixes[0]
            .data;

        /*
         * Approximation
         * matrix[8] represents yaw-like rotation
         * matrix[9] represents pitch-like rotation
         */

        const yaw =
          matrix[8];

        const pitch =
          matrix[9];

        if (yaw > 0.35) {
          addViolationOnce(
            "LOOKING_LEFT"
          );
        }

        if (yaw < -0.35) {
          addViolationOnce(
            "LOOKING_RIGHT"
          );
        }

        if (pitch > 0.25) {
          addViolationOnce(
            "LOOKING_UP"
          );
        }

        if (pitch < -0.25) {
          addViolationOnce(
            "LOOKING_DOWN"
          );
        }
      }

      animationFrameId =
        requestAnimationFrame(
          detectFaces
        );
    };

    initialize();

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      if (
        faceLandmarkerRef.current
      ) {
        faceLandmarkerRef.current.close();
      }
    };
  }, [
    videoRef,
    addViolation,
  ]);
};

export default useFaceDetection;