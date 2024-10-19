import { useContext } from "react"
import { UserContext } from "../UserContext"
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function ContactsHeader()
{
    const{uname}=useContext(UserContext);
    const navigate=useNavigate();
    async function logout()
    {
        const response =await axios.get(import.meta.env.VITE_BACKEND_URL+"/logout");
        if(response.data.redirect)
            {
               navigate(response.data.redirect);
            }
        Cookies.remove("token");
    }
    async function signout()
    {
        const response=await axios.get(process.env.VITE_BACKEND_URL+"/signout");
        if(response.data.redirect)
        {
            navigate(response.data.redirect);
        }
        Cookies.remove("token");
    }
    const name=uname;
    return (
    <div className="flex bg-blue-600 h-[10%] justify-between">
    <div className="font-bold text-xl text-white flex items-center justify-center ml-[1%]">{uname}</div>
    <div className="flex">
    <button onClick={logout} className="text-white mr-[10px]">Logout</button>
    <button onClick={signout} className="text-white">Signout</button>
    </div>
    </div>
    )
}