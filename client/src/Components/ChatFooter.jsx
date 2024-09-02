import { useContext,useRef,} from "react";
import { UserContext1 } from "../UserContext1";

export default function ChatFooter({setdata}) {
    const {message,setmessage,socket,recepientname,recepientsocketid}=useContext(UserContext1);
    const currentref=useRef(null);
    function sender() {
        socket.emit("mess", { "msg": message,"recepientname":recepientname,"recepientsocketid":recepientsocketid,"sendersocketid":socket.id});
        setdata((prevMessages)=>
        [
            ...prevMessages,<div key={message.length} className="flex flex-row-reverse">
                <p className="bg-green-700 pl-[2.25rem] pr-[0.25rem]">{message}</p>
                </div>
        ]
    )
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