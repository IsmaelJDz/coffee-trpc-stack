import cn from "classnames";
import { FC, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { Portal } from "@/components/ui/portal";

type Size = "xs" | "md" | "lg" | "xl" | "none" | "pictures" | "default";

export type ModalProps = {
  show: boolean;
  timer?: number;
  onClose?: () => void;
  size?: Size;
  escClose?: boolean;
  children: React.ReactNode | React.ReactNode[];
};
export const Modal: FC<ModalProps> = ({ children, show, timer, onClose = () => {}, size = "xs", escClose = true }) => {
  const handleClickEsc = (event: { keyCode: number }) => {
    if (event.keyCode === 27 && escClose) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleClickEsc);
    return () => {
      document.removeEventListener("keydown", handleClickEsc);
    };
  }, []);

  useEffect(() => {
    if (show && timer) {
      setTimeout(function () {
        onClose();
      }, timer);
    }

    if (show) {
      window.document.body.style.overflow = "hidden";
      return;
    }

    window.document.body.style.overflow = "auto";
  }, [show]);

  if (!show) return null;

  return (
    <Portal>
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-25">
        <div
          className={cn("relative flex flex-col w-11/12 px-10 py-10 bg-white md:w-1/2 rounded-md", {
            "lg:w-1/3": size === "default",
            "lg:w-2/4": size === "md"
          })}
        >
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <button
              onClick={onClose}
              className="p-1 rounded shadow cursor-pointer hover:text-white hover:bg-blue-grey-200"
            >
              <AiOutlineClose />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};
