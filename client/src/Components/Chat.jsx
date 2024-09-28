import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function Chat({classname})
{
    const [data,setdata]=useState([]);
    // const socket =io("http://localhost:3000");
    const [socket,setsocket]=useState(io("http://localhost:3000"))
    useEffect(()=>
    {
        socket.on("connect",()=>
            {
                console.log(socket.id);
            })
        setsocket(socket);    

    },[])
    return(
        <div className={`${classname}`}>
           <ChatHeader></ChatHeader>
           <ChatBody data={data} setdata={setdata} socket={socket}></ChatBody>  
           <ChatFooter data={data} setdata={setdata} socket={socket}></ChatFooter> 
        </div>
    )
} 