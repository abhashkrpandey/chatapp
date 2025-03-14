import axios from "axios";
import { useContext, useState } from "react"
import { UserContext } from "../UserContext";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const navigate = useNavigate();
    function loginfunc() {
        navigate("/login");
    }
    function inputter(e) {
        if (e.target.name == "UserName") {
            setUserName(e.target.value);
        }
        else if (e.target.name == "Password") {
            setPassword(e.target.value);
        }
        else {
            setNumber(e.target.value);
        }
    }
    async function register(e) {
        e.preventDefault();
        if (userName == "" || password == "" || number == "") {
            Swal.fire(
                {
                    icon: "error",
                    title: "Invalid",
                    text: "Enter proper credentials"
                }
            )
        }
        else {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/register", {
                userName, password, number
            }, { withCredentials: true });
            if (response.data.message == "already present") {
                Swal.fire(
                    {
                        icon: "error",
                        title: "Invalid",
                        text: "Same Credentials Already present"
                    }
                )
            }
            else {
                Cookies.set("userid", response.data.id);
                Cookies.set("username", response.data.uname);
                navigate("/inside");
            }
        }
    }
    return (
        <div className="bg-blue-500 h-screen  flex justify-center">
            <div className="bg-white h-[450px] w-[350px] my-[30px] mx-auto shadow-[0px_2px_2px_rgba(0,0,0,0.3)] rounded-[3px]">
                <form className="flex flex-col p-[30px] ">
                    <h2 className="text-center text-[2rem] mt-[10px] mb-[25px] text-gray-500 font-[500]">Register</h2>
                    <input onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="text" name="UserName" placeholder="Username" required></input>
                    <input onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="password" name="Password" placeholder="Password" required></input>
                    <input onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="number" name="MobileNumber" placeholder="MobileNumber" required></input>
                    <button className="bg-blue-600 w-[18rem] h-[40px] text-white text-[16px] font-bold mb-[1rem] rounded-[2px] active:text-blue-500" onClick={register}>Register</button>
                    <p className="text-center text-gray-500">Already have an Account?</p>
                    <button className="bg-yellow-500 w-[18rem] h-[40px] text-white text-[16px] font-bold mb-[1rem] rounded-[2px] active:text-yellow-500" onClick={loginfunc}>Login</button>
                </form>
            </div>

        </div>
    )
}