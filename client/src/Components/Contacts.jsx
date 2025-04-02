import ContactsHeader from "./ContactsHeader"
import ContactsBody from "./ContactsBody";
export default function Contacts({ socket }) {
    return (
        <div className="flex flex-col w-[35%] border-2 border-blue-500">
            <ContactsHeader></ContactsHeader>
            <ContactsBody socket={socket}></ContactsBody>
        </div>
    )
}