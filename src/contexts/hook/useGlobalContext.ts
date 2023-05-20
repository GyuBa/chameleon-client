import {createContext, useContext} from "react";
import {GlobalContextData} from "../../types/chameleon-client";
export const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);
export default function useGlobalContext() {
    return useContext(GlobalContext);
}
