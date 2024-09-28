import { useContext, useEffect } from "react"
import { UserContext1 } from "../UserContext1"
import { UserContext } from "../UserContext";
import axios from "axios";

export default function ChatBody({ data, setdata, socket }) {
    const { recepietid } = useContext(UserContext1);
    const { uid } = useContext(UserContext);
    console.log(socket.id);
    useEffect(() => {
        if (uid && recepietid) {
            async function func() {
                setdata([]);
                const response = await axios.post("http://localhost:3000/chatdata", { uid, recepietid });
                const impdata = response.data;
                for (let obj of impdata) {

                    if (uid === obj.senderid.toString() && recepietid === obj.receiverid.toString()) {
                        setdata((prevMessages) => [...prevMessages,
                        <div key={Math.random(0, 1)} className="flex flex-row-reverse">
                            <p className="bg-green-700 pl-[0.25rem] pr-[2.25rem]">{obj.data}</p>
                        </div>
                        ])
                    }
                    else if (uid === obj.receiverid.toString() && recepietid === obj.senderid.toString()) {
                        setdata((prevMessages) =>
                            [
                                ...prevMessages, <div key={Math.random(0, 1)} className="flex">
                                    <p className="bg-green-400 pl-[2.25rem] pr-[0.25rem]">{obj.data}</p>
                                </div>
                            ]
                        )
                    }
                    else if (uid === obj.receiverid.toString() && uid === obj.senderid.toString()) {
                        setdata((prevMessages) => [...prevMessages,
                            <div key={Math.random(0, 1)} className="flex flex-row-reverse">
                                <p className="bg-green-700 pl-[0.25rem] pr-[2.25rem]">{obj.data}</p>
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
        <div className="flex flex-col h-[90%] gap-1">
            {data}
        </div>
    )
}