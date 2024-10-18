import { useContext, useState } from "react";

import { UserContext1 } from "../UserContext1";

export default function UsertoContact({ userid, socketid, uname, active }) {
    const { setrecepientname, setrecepientsocketid, setrecepientid, status, setstatus } = useContext(UserContext1);
    const { uid } = useContext(UserContext1);
    function recepientdata() {
        setrecepientname(uname);
        setrecepientsocketid(socketid);
        setrecepientid(userid);
        if (uid === userid) {
            setstatus(active);
        }
    }
    return (
        <div className="flex flex-row justify-between bg-blue-500 my-[1rem] h-[40px] pl-[10px] mx-[1rem] text-gray-50" key={userid}>
            <div className="flex items-center ">{uname}</div>
            {active === true ? <div className="flex items-center">Online</div> : <div className="flex items-center">Offline</div>}
            <button onClick={recepientdata}>
                <svg className="h-8 w-8 text-slate-200" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="10" y1="14" x2="21" y2="3" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
            </button>
        </div>
    )
}