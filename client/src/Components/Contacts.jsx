import ContactsHeader from "./ContactsHeader"
import ContactsBody from "./ContactsBody";
export default function Contacts({classname})
{
    return (
        <div className={classname}>
            <ContactsHeader></ContactsHeader>
            <ContactsBody></ContactsBody>
        </div>
    )
}