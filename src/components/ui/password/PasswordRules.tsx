import React from "react";

import { validatePasswordRules } from "./validations";

// TODO: translate component titles

export function PasswordRules({ password }: { password: string }) {
  const passwordValidation = validatePasswordRules(password);

  if (!passwordValidation) {
    return <></>;
  }

  return (
    <div className="">
      <span className="mr-1 text-xs">At least: </span>
      {passwordValidation.map(({ valid, labelHint }) => (
        <span className={`text-xs ${valid ? "text-green-300" : "text-red-400"}`} key={labelHint}>
          {labelHint}
        </span>
      ))}
    </div>
  );
}
