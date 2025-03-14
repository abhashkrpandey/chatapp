import { createContext, useState } from "react";
export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [uname, setuname] = useState("Someone");
    const [uid, setuid] = useState("Someid");
    const [unumber,setunumber]=useState("something");
    const [confirm,setConfirm]=useState("");
    // const [recepientname, setrecepientname] = useState("Null");
    // const [recepientsocketid, setrecepientsocketid] = useState("Null");
    // const [recepientid, setrecepientid] = useState("Null");

    return (
        <UserContext.Provider value={{confirm,setConfirm,uname, setuname, uid, setuid,unumber,setunumber}}>
            {children}
        </UserContext.Provider>
    )
}