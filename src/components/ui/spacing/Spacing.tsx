import React, { FC } from "react";
type AdvancedTitleProps = {
  size: number;
};

export const AdvancedSpacing: FC<AdvancedTitleProps> = ({ size = 1 }) => {
  const space = [...Array(size).keys()];
  return (
    <>
      {space.map((s, index) => (
        <br key={index} />
      ))}
    </>
  );
};
