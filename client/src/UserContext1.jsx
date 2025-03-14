import { createContext, useEffect, useState } from "react";
export const UserContext1 = createContext();
import Cookies from "js-cookie";
import { io } from "socket.io-client";

export function UserContextProvider1({ children }) {
    const [recepientname, setrecepientname] = useState("Someone")
    const [recepientid, setrecepientid] = useState("");
    const [status, setstatus] = useState("offline");
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_BACKEND_URL);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            setstatus("online");
            newSocket.emit("join-own-room", { roomid: Cookies.get("userid") });
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);
    return (
        <UserContext1.Provider value={{
            recepientname, setrecepientname, recepientid,
            setrecepientid, status, setstatus, socket
        }}>
            {children}
        </UserContext1.Provider>
    )
}