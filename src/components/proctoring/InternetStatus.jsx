import { useEffect } from "react";
import { useProctoring } from "../../context/ProctoringContext";

const InternetStatus = () => {
  const { addViolation } = useProctoring();

  useEffect(() => {
    const offline = () => {
      addViolation("INTERNET_DISCONNECTED");
    };

    window.addEventListener("offline", offline);

    return () =>
      window.removeEventListener(
        "offline",
        offline
      );
  }, []);

  return null;
};

export default InternetStatus;