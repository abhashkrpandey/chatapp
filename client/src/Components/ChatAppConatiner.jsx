import Chat from "./Chat";
import Contacts from "./Contacts";
import Blank from "../Pages/Blank";
import { useEffect, useState,useContext} from "react";
import { io } from "socket.io-client";
import { UserContext1 } from "../UserContext1";

export default function ChatAppContainer()
{
    const [socket,setsocket]=useState(io(process.env.BACKEND_URL))
    const {recepietid}=useContext(UserContext1);
    useEffect(()=>
    {
        socket.on("connect",()=>
            {
                console.log(socket.id);
            })
        setsocket(socket);
    },[])
    return (
        <div className="flex h-screen">
            <Contacts classname="flex-col w-1/4 border-2 border-blue-500" socket={socket}></Contacts>
            {
             recepietid?(<Chat classname="flex-col w-3/4 border-2 border-blue-500" socket={socket}></Chat>):(
                <Blank className="w-1/4 border-2 border-blue-500"></Blank>
             )
           }
        </div>
    )
}