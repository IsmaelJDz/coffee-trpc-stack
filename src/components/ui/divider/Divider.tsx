import React from "react";

export const Divider = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center">
      <div className="grow border border-gray-300 h-0 w-full" />
      <p className="text-gray-600 mx-4">{message}</p>
      <div className="grow border border-gray-300 h-0 w-full" />
    </div>
  );
};
