import { useContext, useRef, useState } from "react";
import { UserContext1 } from "../UserContext1";
import Cookies from "js-cookie";

export default function ChatFooter({ data, setdata }) {
    const { recepientname, recepientid, socket } = useContext(UserContext1);
    const userid = Cookies.get("userid");
    const currentref = useRef(null);
    const [message, setmessage] = useState("");
    async function sender() {
        if (message === "") {
            return;
        }
        socket.emit("mess", { "msg": message, "recepientname": recepientname, "recepientid": recepientid, "userid": userid });
        const somedate = new Date();
        const convertedtime = somedate.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
        const converteddate = somedate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
        currentref.current.value = "";
        setmessage("");
    }
    function inputter(e) {
        setmessage(e.target.value);
    }
    function enterfunc(e) {
        if (e.key == "Enter") {
            sender();
        }
    }
    return (
        <div className="flex h-[5%] fixed w-[65%]">
            <input ref={currentref} onChange={inputter} type="text" placeholder="Message" className="border-2 border-blue-500 w-5/6" onKeyDown={enterfunc}></input>
            <button onClick={sender} type="submit" className="bg-blue-600 w-1/6 text-white" onKeyDown={enterfunc}>Send</button>
        </div>
    )
}