import React from 'react';
import Login from  '../authentication/Login'
import { useStateContext } from '../../contexts/ContextProvider';
import { SubmitButtonData } from '../../types/Types';

export default function({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, onClick, Event} : SubmitButtonData) {
    const { setIsClicked, initialState } = useStateContext();

    return (
        <button
            type="button"
            onClick = {onClick}
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
        >
            {icon}{text}
            {Event}
        </button>
    );
};
