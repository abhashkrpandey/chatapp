import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [userNameLogging, setuserNameLogging] = useState("");
    const [passwordLogging, setpasswordLogging] = useState("");
    const { setuname, setuid } = useContext(UserContext);
    const navigate = useNavigate();
    function inputter(e) {
        if (e.target.name == "UserName") {
            setuserNameLogging(e.target.value);
        }
        else if (e.target.name == "Password") {
            setpasswordLogging(e.target.value);
        }
    }
    async function loginng(e) {
        e.preventDefault();
        const data = await axios.post("http://localhost:3000/login", {
            userNameLogging, passwordLogging
        });
        if (data.data.redirect == "/login") {

            navigate(data.data.redirect);
        }
        else {
            setuname(data.data.uname);
            setuid(data.data.id);
            const data1 = await axios.get("http://localhost:3000/profile");
            if (data1.data.redirect) {
                navigate(data1.data.redirect);
            }
        }
    }
    return (
        <div className="bg-slate-300 h-screen ">
            <form className="flex flex-col items-center justify-center gap-3 " onSubmit={loginng}>
                <input onChange={inputter} className="w-56" type="text" name="UserName" placeholder="Username"></input>
                <input onChange={inputter} className="w-56" type="password" name="Password" placeholder="Password"></input>
                <button className="bg-blue-600 w-56" type="submit">Login</button>
            </form>
        </div>
    )
}