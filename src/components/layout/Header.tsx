import React from 'react';
import {HeaderData} from '../../types/chameleon-client';

export default function Header({title}: HeaderData) {
    return (
        <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</p>
        </div>
    );
};