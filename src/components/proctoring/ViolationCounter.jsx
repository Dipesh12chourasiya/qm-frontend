import { useProctoring } from "../../context/ProctoringContext";

const ViolationCounter = () => {
  const { violations } = useProctoring();

  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded">
      <h3>
        Violations: {violations.length}
      </h3>

      {violations.map((v, index) => (
        <div key={index}>
          {v.type} - {v.timestamp}
        </div>
      ))}
    </div>
  );
};

export default ViolationCounter;