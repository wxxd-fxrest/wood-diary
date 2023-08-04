import React, { useContext } from "react";

export const RealmContext = React.createContext();

export const useRealm = () => {
    return useContext(RealmContext);
};