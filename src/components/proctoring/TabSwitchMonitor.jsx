import { useEffect } from "react";
import { useProctoring } from "../../context/ProctoringContext";

const TabSwitchMonitor = () => {
  const { addViolation } = useProctoring();

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        addViolation("TAB_SWITCH");
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
  }, []);

  return null;
};

export default TabSwitchMonitor;