import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { useState } from "react";
export default function Chat({classname})
{
    const [data,setdata]=useState([]);
    // const [receivermessage, setreceivermessage] = useState([]);
    return(
        <div className={`${classname}`}>
           <ChatHeader></ChatHeader>
           <ChatBody data={data} setdata={setdata}></ChatBody>  
           <ChatFooter setdata={setdata}></ChatFooter> 
        </div>
    )
} 