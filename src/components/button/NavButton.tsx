import {NavButtonData} from "../../types/Types";
import React from "react";

export default function NavButton({customFunc, icon, color, dotColor}: NavButtonData) {
  return (
    <button
      type="button"
      onClick={() => customFunc()}
      style={{color}}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>
      {icon}
    </button>
  );
};