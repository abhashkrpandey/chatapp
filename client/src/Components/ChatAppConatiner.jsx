import Chat from "./Chat";
import Contacts from "./Contacts";
import Blank from "../Pages/Blank";
import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext1 } from "../UserContext1";

export default function ChatAppContainer() {
    const { recepientid } = useContext(UserContext1);
    return (
        <div className="flex flex-row h-screen w-[100%]">
            <Contacts></Contacts>
            {
                recepientid ? (<Chat></Chat>) : (
                    <Blank className="w-[65%] border-2 border-blue-500"></Blank>
                )
            }
        </div>
    )
}