import React from 'react';
import {SubmitButtonData} from '../../types/chameleon-client';

export default function SubmitButton({className, text, onClick, event, disabled}: SubmitButtonData) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={disabled ? `disabled-btn whitespace-nowrap p-2 ${className}` : `hover:drop-shadow-xl whitespace-nowrap p-2 ${className}`}
        >{text}{event}</button>
    );
};