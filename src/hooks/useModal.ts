import { useState } from "react";

export const useModal = () => {
  const [show, setShow] = useState<boolean>(false);

  const close = () => {
    setShow(false);
  };

  const toggle = () => {
    setShow(prevState => !prevState);
  };

  return { show, close, toggle };
};
