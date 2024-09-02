import { useContext } from "react"
import { UserContext } from "../UserContext"

export default function ContactsHeader()
{
    const{uname}=useContext(UserContext);
    const name=uname;
    return (<><div className="font-bold text-xl">Active Users to Contact</div></>)
}