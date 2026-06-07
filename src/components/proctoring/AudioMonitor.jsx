import { useEffect, useRef } from "react";
import { useProctoring } from "../../context/ProctoringContext";

const AudioMonitor = () => {
  const { addViolation } = useProctoring();

  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const animationFrameRef = useRef(null);

  const lastViolationTimeRef = useRef(0);
  const noiseStartTimeRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const startMonitoring = async () => {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            audio: true,
          });

        if (!mounted) {
          stream
            .getTracks()
            .forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        const audioContext =
          new (window.AudioContext ||
            window.webkitAudioContext)();

        audioContextRef.current = audioContext;

        const analyser =
          audioContext.createAnalyser();

        analyser.fftSize = 512;

        const source =
          audioContext.createMediaStreamSource(
            stream
          );

        source.connect(analyser);

        const dataArray =
          new Uint8Array(
            analyser.frequencyBinCount
          );

        const checkAudio = () => {
          analyser.getByteFrequencyData(
            dataArray
          );

          const average =
            dataArray.reduce(
              (sum, value) => sum + value,
              0
            ) / dataArray.length;

          /*
           * Adjust this threshold
           * depending on your environment
           */
          const NOISE_THRESHOLD = 25;

          /*
           * User must be noisy
           * continuously for 2 seconds
           */
          const REQUIRED_DURATION = 2000;

          /*
           * Don't add violation repeatedly
           */
          const VIOLATION_COOLDOWN = 10000;

          if (
            average >
            NOISE_THRESHOLD
          ) {
            if (
              !noiseStartTimeRef.current
            ) {
              noiseStartTimeRef.current =
                Date.now();
            }

            const noisyFor =
              Date.now() -
              noiseStartTimeRef.current;

            if (
              noisyFor >
              REQUIRED_DURATION
            ) {
              const now = Date.now();

              if (
                now -
                  lastViolationTimeRef.current >
                VIOLATION_COOLDOWN
              ) {
                addViolation(
                  "VOICE_DETECTED"
                );

                lastViolationTimeRef.current =
                  now;

                noiseStartTimeRef.current =
                  null;
              }
            }
          } else {
            noiseStartTimeRef.current =
              null;
          }

          animationFrameRef.current =
            requestAnimationFrame(
              checkAudio
            );
        };

        checkAudio();
      } catch (error) {
        console.error(
          "Microphone error:",
          error
        );

        addViolation(
          "MIC_PERMISSION_DENIED"
        );
      }
    };

    startMonitoring();

    return () => {
      mounted = false;

      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      if (
        streamRef.current
      ) {
        streamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }

      if (
        audioContextRef.current
      ) {
        audioContextRef.current.close();
      }
    };
  }, [addViolation]);

  return null;
};

export default AudioMonitor;