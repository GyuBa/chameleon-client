import React from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { DefaultButtonData } from '../../types/Types';

export default function Button({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, padding }: DefaultButtonData){
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setIsClicked(initialState)}
      style={{  backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-${padding} w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} whitespace-nowrap`}
    >
      {icon} {text}
    </button>
  );
};