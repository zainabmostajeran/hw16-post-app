import React from "react";

export const useDebounce = (orgValue: string, timeout = 1000) => {
  const [value, setValue] = React.useState<string>("");
  const timeoutRef = React.useRef<number>();

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setValue(orgValue);
    }, timeout);
  }, [orgValue, timeout]);

  return [value];
};