import React from 'react';
import { HeaderData } from '../../types/Types';

export default function Header ({ category, title } : HeaderData) {
  return(
    <div className="">
      <p className="text-lg text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
    </div>
  );
};