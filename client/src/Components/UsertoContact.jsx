import { useContext, useState } from "react";

import { UserContext1 } from "../UserContext1";

export default function UsertoContact({userid,socketid,uname})
{
       const {setrecepientname,setrecepientsocketid,setrecepientid}=useContext(UserContext1);
    
    function recepientdata()
    {
        setrecepientname(uname);
        setrecepientsocketid(socketid);
        setrecepientid(userid);
       // console.log(recepientname+"----"+recepientsocketid+"----"+recepietid);
    }
    return (
         <div className="flex flex-row justify-between" key={userid}>
             <div>Name:{uname}</div>
             <button onClick={recepientdata}>Message</button>
         </div>
    )
}