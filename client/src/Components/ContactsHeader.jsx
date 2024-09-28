import { useContext } from "react"
import { UserContext } from "../UserContext"
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function ContactsHeader()
{
    const navigate=useNavigate();
    async function logout()
    {
        const response =await axios.get("http://localhost:3000/logout");
        if(response.data.redirect)
            {
               navigate(response.data.redirect);
            }
        Cookies.remove("token");
    }
    async function signout()
    {
        const response=await axios.get("http://localhost:3000/signout");
        if(response.data.redirect)
        {
            navigate(response.data.redirect);
        }
        Cookies.remove("token");
    }
    const{uname}=useContext(UserContext);
    const name=uname;
    return (
    <div className="flex">
    <div className="font-bold text-xl">Active Users to Contact</div>
    <button onClick={logout}>Logout</button>
    <button onClick={signout}>Signout</button>
    </div>
    )
}