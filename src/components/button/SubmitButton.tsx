import React from 'react';
import { SubmitButtonData } from '../../types/Types';

export default function SubmitButton({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, onClick, disabled, Event} : SubmitButtonData) {
    return (
        <button
            type="button"
            onClick = {onClick}
            disabled = {disabled}
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} whitespace-nowrap`}
        >
            {icon}{text}
            {Event}
        </button>
    );
};