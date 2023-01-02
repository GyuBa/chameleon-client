import React from 'react';
import { SubmitButtonData } from '../../types/Types';

export default function SubmitButton({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, onClick, Event} : SubmitButtonData) {
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
