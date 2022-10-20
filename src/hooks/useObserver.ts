import { useEffect, useRef, useState } from "react";

/**
 * custom Hook
 * @param {*} none
 * Desc: observer viewport
 */

export function useObserver() {
  const element = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(
    function () {
      const options = {
        root: null,
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.25
      };

      const observer = new window.IntersectionObserver(function (entries) {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      }, options);
      observer.observe(element.current!);
    },

    [element.current]
  );

  return [show, element];
}
