import { useContext } from "react"
import { UserContext } from "../UserContext"

export default function ChatApp()
{
    const {uname,uid}=useContext(UserContext);
    return (
            <div className="flex h-screen">
                 <div className="flex-col w-1/2 border-2 border-black">
                     <div className="font-bold text-xl">Chats</div>
                     <div>{uname}(You)</div>
                     <div>Person1</div>
                     <div>Person2</div>
                 </div>
                 <div className="flex flex-col w-1/2 justify-between border-2 border-black">
                    <div className="font-bold text-xl ">User</div>
                    <div></div>
                    <div className="flex">
                        <input type="text" placeholder="Message" className="w-5/6 border-2 border-black"></input>
                        <button type="submit" className="w-1/6 bg-blue-600">Send</button>
                    </div>
                 </div>
            </div>
    )
}