import ContactsHeader from "./ContactsHeader"
import ContactsBody from "./ContactsBody";
export default function Contacts({classname,socket})
{
    return (
        <div className={classname}>
            <ContactsHeader></ContactsHeader>
            <ContactsBody socket={socket}></ContactsBody>
        </div>
    )
}