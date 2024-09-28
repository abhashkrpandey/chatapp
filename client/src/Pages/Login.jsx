import { useState, useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Login() {
    const [userNameLogging, setuserNameLogging] = useState("");
    const [passwordLogging, setpasswordLogging] = useState("");
    const [numberLogging,setnumberLoggging]=useState("");
    const { setuname, setuid ,setunumber} = useContext(UserContext);
    const navigate = useNavigate();
    const userref=useRef(null);
    const passwordref=useRef(null);
    const numberref=useRef(null);
    function inputter(e) {
        if (e.target.name == "UserName") {
            setuserNameLogging(e.target.value);
        }
        else if (e.target.name == "Password") {
            setpasswordLogging(e.target.value);
        }
        else
        {
            setnumberLoggging(e.target.value);
        }
    }
    async function loginng(e) {
        
        e.preventDefault();
        const data = await axios.post("http://localhost:3000/login", {
            userNameLogging, passwordLogging,numberLogging
        });
        userref.current.value="";
        passwordref.current.value="";
        numberref.current.value="";
        if (data.data.redirect =="/notvaliduser") {

            Swal.fire(
                {
                    icon:"error",
                    title:"Invalid",
                    text:"Wrong Credentials"
                }
            )

        }
        else {
            setuname(data.data.uname);
            setuid(data.data.id);
            setunumber(data.data.number);
            const data1 = await axios.get("http://localhost:3000/profile");
            if (data1.data.redirect) {
                navigate(data1.data.redirect);
            }
        }
    }
    return (
        <div className="bg-slate-300 h-screen ">
            <form className="flex flex-col items-center justify-center gap-3 " onSubmit={loginng}>
                <input ref={userref} onChange={inputter} className="w-56" type="text" name="UserName" placeholder="Username"></input>
                <input ref={passwordref} onChange={inputter} className="w-56" type="password" name="Password" placeholder="Password"></input>
                <input ref={numberref}onChange={inputter} className="w-56" type="number" name="MobileNumber" placeholder="MobileNumber"></input>
                <button className="bg-blue-600 w-56" type="submit">Login</button>
            </form>
        </div>
    )
}