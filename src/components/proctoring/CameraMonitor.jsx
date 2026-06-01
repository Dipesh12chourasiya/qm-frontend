import {
  useEffect,
  useRef,
} from "react";

import { useProctoring } from "../../context/ProctoringContext";

const CameraMonitor = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const { addViolation } = useProctoring();

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
          });

        if (!mounted) {
          stream
            .getTracks()
            .forEach((track) =>
              track.stop()
            );
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;
        }
      } catch (error) {
        addViolation(
          "CAMERA_PERMISSION_DENIED"
        );
      }
    };

    startCamera();

    return () => {
      mounted = false;

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }

      if (videoRef.current) {
        videoRef.current.srcObject =
          null;
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="fixed bottom-4 right-4 w-48 rounded-lg border bg-black z-50"
    />
  );
};

export default CameraMonitor;