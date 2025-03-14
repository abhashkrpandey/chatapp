import { UserContextProvider1 } from "../UserContext1";
import ChatAppContainer from "../Components/ChatAppConatiner";
import NotLoggined from "./NotLogging";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function ChatApp() {
    const {uname,uid,setuname,setuid,setunumber,confirm,setConfirm}=useContext(UserContext);
      useEffect(()=>
    {
        async function refresher(){
        const response=await axios.get(import.meta.env.VITE_BACKEND_URL+"/inside");
        // console.log(response.data.message);
        setConfirm(response.data.message);
    }
        refresher();
    },[])
    return (
        <UserContextProvider1>
            {confirm==="Not Ok"?(<NotLoggined></NotLoggined>):(
             <ChatAppContainer></ChatAppContainer>
            )}
        </UserContextProvider1>
    )
}