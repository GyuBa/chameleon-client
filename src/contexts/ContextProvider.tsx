import React, {createContext, useContext, useState} from 'react';
const StateContext = createContext<any>({});

export default function ContextProvider({children}: { children: React.ReactNode }) {
    const [activeMenu, setActiveMenu] = useState(true);

    return (
        <StateContext.Provider value={{ activeMenu, setActiveMenu }}>{children}</StateContext.Provider>
    );
};

export function useStateContext() {
    return useContext(StateContext);
}
