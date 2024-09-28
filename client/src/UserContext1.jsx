import { createContext, useEffect, useState} from "react";
export const UserContext1 =createContext();
import { io } from "socket.io-client";

export  function UserContextProvider1({children})
{
    const [message, setmessage] = useState("");
    const [recepientname, setrecepientname] = useState("Someone");
    const [recepientsocketid, setrecepientsocketid] = useState("");
    const [recepietid, setrecepientid] = useState("");
    return (
        <UserContext1.Provider value={{message,setmessage,recepientname,setrecepientname,recepientsocketid,setrecepientsocketid,recepietid,setrecepientid}}>
             {children}
        </UserContext1.Provider>
    )
}