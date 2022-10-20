import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, wait = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update the inner state after <wait> ms
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    // Clear timeout in case a new value is received
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value]);

  return debouncedValue;
}
