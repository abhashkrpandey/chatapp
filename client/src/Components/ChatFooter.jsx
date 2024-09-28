import { useContext,useRef,} from "react";
import { UserContext1 } from "../UserContext1";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function ChatFooter({data,setdata,socket}) {
    const {message,setmessage,recepientname,recepientsocketid,recepietid}=useContext(UserContext1);
    const {uid}=useContext(UserContext);
    const currentref=useRef(null);
    async function sender() {
        socket.emit("mess", { "msg": message,"recepientname":recepientname,"recepientsocketid":recepientsocketid,"sendersocketid":socket.id,"recepietid":recepietid,"senderid":uid});
        setdata((prevMessages)=>
        [
            ...prevMessages,<div key={Math.random(0,1)} className="flex flex-row-reverse">
                <p className="bg-green-700 pl-[2.25rem] pr-[0.25rem]">{message}</p>
                </div>
        ]
    )
    // const impdata1=await axios.post("http://localohost:3000/chatdata",{uid});
    //      console.log(impdata1);
        currentref.current.value="";
    }
    function inputter(e) {
        setmessage(e.target.value);
        
    }
    return (
               <div className="flex h-[5%]">
                <input ref={currentref} onChange={inputter} type="text" placeholder="Message" className="border-2 border-black w-5/6"></input>
                <button onClick={sender}  type="submit" className="bg-blue-600 w-1/6">Send</button>
               </div>
    )
}