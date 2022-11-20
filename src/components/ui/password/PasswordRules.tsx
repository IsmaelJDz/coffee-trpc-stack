import React from "react";

import { validatePasswordRules } from "./validations";

// TODO: translate component titles

export function PasswordRules({ password }: { password: string }) {
  const passwordValidation = validatePasswordRules(password);

  if (!passwordValidation) {
    return null;
  }

  return (
    <div className="">
      <span className="mr-1 text-xs">At least: </span>
      {passwordValidation.map(({ valid, labelHint }) => (
        <span className={`text-xs text-gray-600 ${valid ? "text-green-300" : "text-gray-600"}`} key={labelHint}>
          {labelHint}
        </span>
      ))}
    </div>
  );
}
