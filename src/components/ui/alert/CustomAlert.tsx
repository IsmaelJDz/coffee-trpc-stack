import React from "react";

type CustomAlertProps = {
  arrowDirection?: "left" | "left-top" | "right" | "right-top";
  message: string;
};

export const CustomAlert = ({ arrowDirection, message }: CustomAlertProps) => {
  return (
    <div
      className={`talk-bubble alert-absolute triangle rounded bg-primary ${
        arrowDirection === "left" ? "left-top" : "right-top"
      }`}
    >
      <div className="talktext">
        <p> {message} </p>
      </div>
    </div>
  );
};
