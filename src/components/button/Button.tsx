import React from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { DefaultButtonData } from '../../types/Types';

export default function Button({style, className, icon, text}: DefaultButtonData){
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setIsClicked(initialState)}
      style={style}
      className={`hover:drop-shadow-xl whitespace-nowrap ` + className}
    >{icon}{text}</button>
  );
};