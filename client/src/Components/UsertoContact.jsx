import { useContext, useState } from "react";
import ChatHeader from "./ChatHeader";
import { UserContext1 } from "../UserContext1";

export default function UsertoContact({uid,socketid,uname})
{
    // const [recepientname,setrecepientname]=useState();
    // const [recepientsocketid,setrecepientsocketid]=useState();
    // const [recepietid,setrecepientid]=useState();
       const {setrecepientname,setrecepientsocketid,setrecepientid,socket}=useContext(UserContext1);
    
    function recepientdata()
    {
        setrecepientname(uname);
        setrecepientsocketid(socketid);
        setrecepientid(uid);
       // console.log(recepientname+"----"+recepientsocketid+"----"+recepietid);
    }
    return (
         <div className="flex flex-row justify-between" key={uid}>
             <div>Name:{uname}</div>
             <button onClick={recepientdata}>Message</button>
         </div>
    )
}