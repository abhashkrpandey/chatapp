import { UserContextProvider1 } from "../UserContext1";
import ChatAppContainer from "../Components/ChatAppConatiner";
import NotLoggined from "./NotLogging";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function ChatApp() {
    const {uname,uid,setuname,setuid,setunumber}=useContext(UserContext);
    const [responseofinside,setresponseofinside]=useState({data:{
        redirect:""
    }});
      useEffect(()=>
    {
        async function refresher(){
        const response=await axios.get(import.meta.env.VITE_BACKEND_URL+"/inside");
        setuname( response.data.uname);
        setuid(response.data.id);
        setunumber(response.data.number);
        setresponseofinside(response);
    }
        refresher();
    },[setuid,setuname,setunumber])
    return (
        <UserContextProvider1 >
            {responseofinside.data.redirect==="/notidentified"?(<NotLoggined></NotLoggined>):(
             <ChatAppContainer></ChatAppContainer>
            )}
        </UserContextProvider1>
    )
}