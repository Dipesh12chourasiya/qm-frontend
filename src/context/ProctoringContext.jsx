import { createContext, useContext, useState } from "react";

const ProctoringContext = createContext();

export const ProctoringProvider = ({ children }) => {
  const [violations, setViolations] = useState([]);

  const addViolation = (type) => {
    setViolations((prev) => [
      ...prev,
      {
        type,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  return (
    <ProctoringContext.Provider
      value={{
        violations,
        addViolation,
      }}
    >
      {children}
    </ProctoringContext.Provider>
  );
};

export const useProctoring = () =>
  useContext(ProctoringContext);