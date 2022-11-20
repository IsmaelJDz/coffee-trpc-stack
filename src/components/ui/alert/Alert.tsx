import React, { FC, useEffect, useState } from "react";

type AlertProps = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  autoHidden?: boolean;
  seconds?: number;
};

export const Alert: FC<AlertProps> = ({ message, type = "info", autoHidden = false, seconds = 3000 }) => {
  const [hideAlert, setHideAlert] = useState<boolean>(false);

  useEffect(() => {
    if (autoHidden) {
      setTimeout(() => {
        setHideAlert(true);
      }, seconds);
    }

    return () => {
      setHideAlert(false);
    };
  }, [autoHidden]);

  return !hideAlert ? (
    <div
      className={`w-3/4 bg text-center text-white rounded-md p-2
        ${type === "success" ? "bg-green-500" : null}
        ${type === "error" ? "bg-red-A100" : null}
        ${type === "warning" ? "bg-yellow-500" : null}
        ${type === "info" ? "bg-blue-500" : null}`}
    >
      <p>{message}</p>
    </div>
  ) : null;
};
