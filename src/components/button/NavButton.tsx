import {NavButtonData} from "../../types/Types";
import React from "react";

export default function NavButton({customFunc, icon, color}: NavButtonData) {
  return (
    <button
      type="button"
      onClick={() => customFunc()}
      style={{color}}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >{icon}</button>
  );
};