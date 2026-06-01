import { useEffect } from "react";
import { useProctoring } from "../../context/ProctoringContext";

const FullscreenMonitor = () => {
  const { addViolation } = useProctoring();

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        addViolation("FULLSCREEN_EXIT");
      }
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
    };
  }, [addViolation]);

  return null;
};

export default FullscreenMonitor;