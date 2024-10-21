import React from "react";
import { useDebounce } from "../hooks/Usedebounce";


export const DebounceInput = () => {
  const [orgValue, setOrgValue] = React.useState<string>("");
  useDebounce(orgValue, 1000);

  const changeMessage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setOrgValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={orgValue}
      onChange={changeMessage}
      className="w-52 h-9 text-gray-700 px-3 outline-none rounded-xl text-base"
    />
  );
};
