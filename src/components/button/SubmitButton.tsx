import React from 'react';
import { SubmitButtonData } from '../../types/Types';

export default function SubmitButton({ style, className, icon, text, onClick, event} : SubmitButtonData) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={style}
            className={`flex hover:drop-shadow-xl whitespace-nowrap p-3 ${className}`}
        >{icon}{text}{event}</button>
    );
};
