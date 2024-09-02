import Chat from "./Chat";
import Contacts from "./Contacts";

export default function ChatAppContainer()
{
    return (
        <div className="flex h-screen">
            <Contacts classname="flex-col w-1/2 border-2 border-black"></Contacts>
            <Chat classname="flex-col w-1/2 border-2 border-black"></Chat>
        </div>
    )
}