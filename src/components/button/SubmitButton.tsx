import React from 'react';
import { SubmitButtonData } from '../../types/Types';

export default function SubmitButton({  style, className, icon, text, onClick, Event, disabled} : SubmitButtonData) {
    return (
        <button
            onClick={onClick}
            style={style}
            disabled = {disabled}
            className={`hover:drop-shadow-xl whitespace-nowrap p-3 ` + className}
        >{icon}{text}{Event}</button>
    );
};