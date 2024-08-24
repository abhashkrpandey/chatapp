import { createContext, useState } from "react";
export const UserContext =createContext();

export  function UserContextProvider({children})
{
    const [uname,setuname]=useState("Nothing");
    const [uid,setuid]=useState("No-thing");
    
    return (
        <UserContext.Provider value={{uname,setuname,uid,setuid}}>
             {children}
        </UserContext.Provider>
    )
}