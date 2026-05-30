import React, {
  useEffect,
  useState,
} from "react";

const Timer = ({
  duration,
  onTimeUp,
}) => {
  const [seconds, setSeconds] =
    useState(duration * 60);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(
              interval
            );

            onTimeUp?.();

            return 0;
          }

          return prev - 1;
        });
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [onTimeUp]);

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  return (
    <div className="bg-black text-white px-6 py-3 rounded-xl font-semibold text-lg">
      {String(minutes).padStart(
        2,
        "0"
      )}
      :
      {String(
        remainingSeconds
      ).padStart(2, "0")}
    </div>
  );
};

export default Timer;