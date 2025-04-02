import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function ContactsHeader() {
    const { confirm, setConfirm } = useContext(UserContext);
    const username = Cookies.get("username");
    const navigate = useNavigate();
    const [isVisible, setisVisible] = useState(false);
    function isVisibleFunc() {
        if (isVisible == true) {
            setisVisible(false);
        }
        else {
            setisVisible(true);
        }
    }
    async function logout() {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/logout");
        if (response.data.redirect) {
            navigate(response.data.redirect);
        }
        setConfirm("Not Ok");
        Cookies.remove("jwttoken");
    }
    async function signout() {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/signout");
        if (response.data.redirect) {
            navigate(response.data.redirect);
        }
        setConfirm("Not Ok");
        Cookies.remove("jwttoken");
    }
    // const name=uname;
    return (
        <div className="flex bg-blue-600 w-[35%] h-[10%] justify-between items-center px-4 fixed ">
            <div className="font-bold lg:text-base md:text-sm sm:text-xs text-white flex items-center justify-center lg:ml-[1%]">{username}</div>
            <div className="flex">
                {(isVisible) ? (
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <button onClick={logout} className="text-white lg:mr-[10px] md:mr-[5px] sm:mr-[2px] lg:text-base md:text-sm sm:text-xs">Signout</button>
                            <button onClick={signout} className="text-white lg:mr-[10px] md:mr-[5px] sm:mr-[2px] lg:text-base md:text-sm sm:text-xs">Delete</button>
                        </div>
                        <div onClick={isVisibleFunc}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x text-white" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                        </div>
                    </div>
                ) :
                    (
                        <div className="flex flex-row items-center" onClick={isVisibleFunc}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots-vertical text-white" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                        </div>
                    )
                }
            </div>
        </div>
    )
}