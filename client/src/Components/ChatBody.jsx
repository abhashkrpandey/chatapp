import { useContext, useEffect } from "react"
import { UserContext1 } from "../UserContext1"
import { UserContext } from "../UserContext";
import axios from "axios";

export default function ChatBody({ data, setdata, socket }) {
    const { recepietid } = useContext(UserContext1);
    const { uid } = useContext(UserContext);
    var newdate,converteddate1,convertedtime1;
    useEffect(() => {
        if (uid && recepietid) {
            async function func() {
                setdata([]);
                const response = await axios.post(process.env.BACKEND_URL+"/chatdata", { uid, recepietid });
                const impdata = response.data;
                for (let obj of impdata) {

                    if (uid === obj.senderid.toString() && recepietid === obj.receiverid.toString()) {
                        newdate = new Date(obj.createdAt);
                        convertedtime1 = newdate.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
                        converteddate1 = newdate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
                        setdata((prevMessages) => [...prevMessages,
                        <div key={Math.random(0, 1)} className="flex flex-row-reverse mt-[2%]">
                            <div className="bg-green-700 pl-[0.25rem] pr-[2.25rem]">
                                <div className="text-white">
                                    {obj.data}
                                </div>
                                <div className="flex flex-row-reverse text-white">
                                    {
                                        converteddate1 + " at " +
                                        convertedtime1
                                    }
                                </div>
                            </div>
                        </div>
                        ])
                    }
                    else if (uid === obj.receiverid.toString() && recepietid === obj.senderid.toString()) {
                        newdate = new Date(obj.createdAt);
                        convertedtime1 = newdate.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
                        converteddate1 = newdate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
                        setdata((prevMessages) =>
                            [
                                ...prevMessages, <div key={Math.random(0, 1)} className="flex mt-[2%]">
                                    <div className="bg-green-400 pl-[2.25rem] pr-[0.25rem]">
                                        <div>
                                            {obj.data}
                                        </div>
                                        <div className="flex flex-row-reverse">
                                            {
                                                converteddate1 + " at " +
                                                convertedtime1
                                            }
                                        </div>
                                    </div>
                                </div>
                            ]
                        )
                    }
                    else if (uid === obj.receiverid.toString() && uid === obj.senderid.toString()) {
                        newdate = new Date(obj.createdAt);
                        convertedtime1 = newdate.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
                        converteddate1 = newdate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
                        setdata((prevMessages) => [...prevMessages,
                        <div key={Math.random(0, 1)} className="flex flex-row-reverse mt-[2%]">
                            <div className="bg-green-700 pl-[0.25rem] pr-[2.25rem]">
                                <div>
                                    {obj.data}
                                </div>
                                <div className="flex flex-row-reverse">
                                    {
                                        converteddate1 + " at " +
                                        convertedtime1
                                    }
                                </div>
                            </div>
                        </div>
                        ])

                    }
                }
            }
            func()
        }
    }, [recepietid])
    useEffect(() => {
        socket.on("server-respo", async (args) => {
            setdata((prevMessages) => [
                ...prevMessages,
                <div key={Math.random(0, 1)} className="flex">
                    <p className="bg-green-400 pl-[0.25rem] pr-[2.25rem]">{args.msg}</p>
                </div>
            ]);
        });
        return () => {
            socket.off("server-respo");
        };
    }
        , [socket])
    return (
        <div className="flex flex-col h-[85%] gap-1 overflow-y-auto">
            {data}
        </div>
    )
}