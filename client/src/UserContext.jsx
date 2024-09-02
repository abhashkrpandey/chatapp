import { createContext, useState } from "react";
export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [uname, setuname] = useState("Someone");
    const [uid, setuid] = useState("Someid");
    // const [recepientname, setrecepientname] = useState("Null");
    // const [recepientsocketid, setrecepientsocketid] = useState("Null");
    // const [recepietid, setrecepientid] = useState("Null");

    return (
        <UserContext.Provider value={{ uname, setuname, uid, setuid}}>
            {children}
        </UserContext.Provider>
    )
}