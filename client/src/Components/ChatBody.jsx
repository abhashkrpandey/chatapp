import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { UserContext1 } from "../UserContext1";
import Cookies from "js-cookie";
import axios from "axios";
import MessageBody from "./MessageBody";

export default function ChatBody({ data, setdata }) {
    const { socket, recepientid } = useContext(UserContext1);
    const userid = Cookies.get("userid");

    const [dataFromDb, setdataFromDb] = useState([]);
    const [visibleIds, setVisibleIds] = useState([]);

    useEffect(() => {
        const handleMessage = (message) => {
            setdata((prevData) => [...prevData, message]);
        };

        socket.on("message-from-server", handleMessage);
        return () => socket.off("message-from-server", handleMessage);
    }, [socket]);

    useEffect(() => {
        if (visibleIds.length > 0) {
            socket.emit("message-read-id", { ids: visibleIds, recepientid: recepientid, userid: userid });
        }
        return () => socket.off("message-read-id");
    }, [visibleIds, recepientid,socket]);

    let allChatsCombined = useMemo(() => {
        const seenIds = new Set();
        return [...dataFromDb, ...data].filter((item) => {
            if (seenIds.has(item._id)) return false;
            seenIds.add(item._id);
            return true;
        });
    }, [data, dataFromDb]);

    useEffect(() => {
        async function fetchChatData() {
            if (!userid || !recepientid) return;
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chatdata`, { userid, recepientid });
                setdataFromDb(response.data.chat);
            } catch (error) {
                console.error("Error fetching chat data:", error);
            }
        }
        fetchChatData();
        setdata([]);
        allChatsCombined=[];
    }, [recepientid]);

    return (
        <div className="flex flex-col h-[95%] gap-1 overflow-y-auto pt-20">
            {allChatsCombined.map((obj) => (
                <MessageBody
                    key={obj._id}
                    obj={obj}
                    userid={userid}
                    recepientid={recepientid}
                    visibleIds={visibleIds}
                    setVisibleIds={setVisibleIds}
                />
            ))}
        </div>
    );
}
