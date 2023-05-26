import React, {useEffect, useState} from 'react';
import {HiOutlineSearch} from "react-icons/hi";
import {useLocation} from "react-router-dom";

export default function ModelsSearchBar({setSearchTerm}: {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}) {
    const location = useLocation();
    const [temporarySearchTerm, setTemporarySearchTerm] = useState('');
    useEffect(()=>{
        setTemporarySearchTerm('');
    }, [location.pathname]);
    return (
            <div className="relative w-96">
                <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900
                    bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2
                    border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search Model Name, Input, Output..."
                    value={temporarySearchTerm}
                    onChange={(e) => setTemporarySearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setSearchTerm(temporarySearchTerm);
                        }
                    }}
                />
                <button
                    type="button"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium
                    text-white bg-main-blue rounded-r-lg border border-blue-700
                    hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    onClick={() => setSearchTerm(temporarySearchTerm)}
                ><HiOutlineSearch size={20}/>
                </button>
        </div>
    )
};