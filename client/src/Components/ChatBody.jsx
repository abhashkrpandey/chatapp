import { useContext, useEffect} from "react"
import { UserContext1 } from "../UserContext1"

export default function ChatBody({data,setdata}) {
    const { socket } = useContext(UserContext1);
    socket.on("connect",()=>
    {
        
    });
    // useEffect(() => { 
    //     socket.on("server-respo", (args) => {
    //         setdata((prevMessages) => [
    //             ...prevMessages,
    //             <div key={prevMessages.length} className="flex">
    //                 <p className="bg-green-400 pl-[0.25rem] pr-[2.25rem]">{args.msg}</p>
    //                 </div>
    //         ]);
    //     });
    //     return ()=>{
    //         socket.off("server-respo");
    //     }
    // }, [socket]); 
    socket.on("server-respo", (args) => {
        setdata((prevMessages) => [
            ...prevMessages,
            <div key={prevMessages.length} className="flex">
                <p className="bg-green-400 pl-[0.25rem] pr-[2.25rem]">{args.msg}</p>
                </div>
        ]);
    });
    return (
        <div className="flex flex-col h-[90%] gap-1">
            {data}
        </div>
    )
}