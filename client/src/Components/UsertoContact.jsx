import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { UserContext1 } from "../UserContext1";
import { UserContext } from "../UserContext";

const UsertoContact = React.memo(function UsertoContact({ userid, username, activeStatus, newMessage }) {
    const { setrecepientname, setrecepientid, status, socket, recepientid } = useContext(UserContext1);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    useEffect(() => {
        socket.on("new-notification", (args) => {
            if (args.userid == userid) {
                setHasNewMessage(true);
            }
        })
        socket.on("all-chats-are-read", (args) => {
            // console.log("wee");
            if (args.recepientid == recepientid) {
                setHasNewMessage(false);
            }
        })
        return () => {
            socket.off("new-notification");
            socket.off("all-chats-are-read");
        }
    }, [socket,recepientid])
    function recepientdata() {
        setrecepientname(username);
        setrecepientid(userid);
    }
    return (
        <div className="flex flex-row justify-between bg-blue-500 my-[1rem] h-[50px] pl-[10px] mx-[1rem] text-gray-50" key={userid}>
            <div className="flex flex-row">
                <div className="flex items-center">
                    {(hasNewMessage || newMessage) && (<div className="flex  items-center w-2 h-2 bg-red-500 rounded-full ml-2"></div>)}
                </div>
                <div className="flex flex-col items-center">
                    <div>{username}</div>
                    {userid === Cookies.get("userid") ? (<div className="flex items-center">{status}</div>) : (<div className="flex items-center">{activeStatus}</div>)}
                </div>

            </div>
            <button onClick={recepientdata}>
                <svg className="h-8 w-8 text-slate-200" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="10" y1="14" x2="21" y2="3" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
            </button>
        </div>
    )
});

export default UsertoContact;