import { useState, useContext, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Login() {
    const [userNameLogging, setuserNameLogging] = useState("");
    const [passwordLogging, setpasswordLogging] = useState("");
    const [numberLogging, setnumberLoggging] = useState("");
    const navigate = useNavigate();
    const userref = useRef(null);
    const passwordref = useRef(null);
    const numberref = useRef(null);
    function inputter(e) {
        if (e.target.name == "UserName") {
            setuserNameLogging(e.target.value);
        }
        else if (e.target.name == "Password") {
            setpasswordLogging(e.target.value);
        }
        else {
            setnumberLoggging(e.target.value);
        }
    }
    async function loginng(e) {
        e.preventDefault();
        if (passwordLogging.length < 6 && passwordLogging >= 0) {
            Swal.fire(
                {
                    icon: "warning",
                    title: "Too Small Password",
                    text: "Enter Atleast 6 digits"
                }
            )
        }
        if (numberLogging.length < 10 && numberLogging > 0 || numberLogging > 10) {
            Swal.fire(
                {
                    icon: "warning",
                    title: "Not Valid Length",
                    text: "Enter 10 digit number"
                }
            )
        }
        else {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/login", {
                userNameLogging, passwordLogging, numberLogging
            }, { withCredentials: true });
            userref.current.value = "";
            passwordref.current.value = "";
            numberref.current.value = "";
            if (response.data.message == "notvaliduser") {

                Swal.fire(
                    {
                        icon: "error",
                        title: "Invalid",
                        text: "Wrong Credentials"
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
            <div className="bg-white h-[390px] w-[350px] my-[30px] mx-auto shadow-[0px_2px_2px_rgba(0,0,0,0.3)] rounded-[3px]">
                <form className="flex flex-col p-[30px] ">
                    <h2 className="text-center text-[2rem] mt-[10px] mb-[25px] text-gray-500 font-[500]">Login</h2>
                    <input ref={userref} onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="text" name="UserName" placeholder="Username" required></input>
                    <input ref={passwordref} onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="password" name="Password" placeholder="Password" required></input>
                    <input ref={numberref} onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="number" name="MobileNumber" placeholder="MobileNumber" required></input>
                    <button className="bg-blue-600 w-[18rem] h-[40px] text-white text-[16px] font-bold rounded-[2px] active:text-blue-500" onClick={loginng}>Login</button>
                </form>
            </div>
        </div>
    )
}