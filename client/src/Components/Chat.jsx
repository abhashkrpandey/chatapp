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
    const {recepientid}=useContext(UserContext1);
    return(
        <div className="flex-col w-[65%] border-2 border-blue-500">
           <ChatHeader></ChatHeader>
           <ChatBody data={data} setdata={setdata}></ChatBody>  
           <ChatFooter data={data} setdata={setdata}></ChatFooter> 
        </div>
    )
} 