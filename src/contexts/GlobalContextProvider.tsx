import React, {useState} from 'react';
import {GlobalContextData, ModelUploadData} from "../types/chameleon-client";
import {GlobalContext} from "./hook/useGlobalContext";

export default function GlobalContextProvider({children, value}: { children: React.ReactNode, value: GlobalContextData }) {
    return (
        <GlobalContext.Provider
            value={value}>{children}</GlobalContext.Provider>
    );
};