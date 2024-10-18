import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { useState ,useContext} from "react";
import { UserContext } from "../UserContext";
import { UserContext1 } from "../UserContext1";
export default function Chat({classname,socket})
{
    const [data,setdata]=useState([]);
    const { uid} = useContext(UserContext);
    const {recepietid}=useContext(UserContext1);
    return(
        <div className={`${classname}`}>
           <ChatHeader></ChatHeader>
           <ChatBody data={data} setdata={setdata} socket={socket}></ChatBody>  
           <ChatFooter data={data} setdata={setdata} socket={socket}></ChatFooter> 
        </div>
    )
} 