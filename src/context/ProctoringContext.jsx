import {
  createContext,
  useContext,
  useState,
} from "react";

const ProctoringContext =
  createContext();

export const ProctoringProvider = ({
  children,
}) => {
  const [violations, setViolations] =
    useState([]);

  const [testTerminated,
    setTestTerminated] =
    useState(false);

  const MAX_WARNINGS = 2;

  const addViolation = (
    type,
    details = ""
  ) => {
    setViolations((prev) => {
      const updated = [
        ...prev,
        {
          type,
          details,
          timestamp:
            new Date().toLocaleTimeString(),
        },
      ];

      if (
        updated.length >
        MAX_WARNINGS
      ) {
        setTestTerminated(
          true
        );
      }

      return updated;
    });
  };

  return (
    <ProctoringContext.Provider
      value={{
        violations,
        addViolation,
        testTerminated,
        warningCount:
          violations.length,
        warningsRemaining:
          Math.max(
            0,
            MAX_WARNINGS -
              violations.length
          ),
      }}
    >
      {children}
    </ProctoringContext.Provider>
  );
};

export const useProctoring =
  () =>
    useContext(
      ProctoringContext
    );