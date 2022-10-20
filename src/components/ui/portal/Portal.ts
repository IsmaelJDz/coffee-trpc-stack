import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const Portal: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.querySelector("#portal") as Element | DocumentFragment) : null;
};
