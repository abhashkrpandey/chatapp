import axios from "axios";
import { useContext, useState } from "react"
import { UserContext } from "../UserContext";
import { useNavigate,Link } from "react-router-dom";

export default function Register()
{
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [number,setNumber]=useState("");
    const {setuname,setuid,setunumber}=useContext(UserContext);
    const navigate=useNavigate();
    function inputter(e)
    {
         if(e.target.name=="UserName")
         {
           setUserName(e.target.value);
         }
         else if(e.target.name=="Password"){
            setPassword(e.target.value);
         }
         else{
            setNumber(e.target.value);
         }
    }
   async function register(e)
    {
        e.preventDefault();
       const data= await axios.post(import.meta.env.VITE_BACKEND_URL+"/register",{
            userName,password,number});
            setuname(data.data.uname);
            setuid(data.data.id);
            setunumber(data.data.number);
         const data1=await axios.get(import.meta.env.VITE_BACKEND_URL+"/profile");
         if(data1.data.redirect)
         {
            navigate(data1.data.redirect);
         }
    }
    return (
        <div className="bg-blue-500 h-screen  flex justify-center">
            <div className="bg-white h-[450px] w-[350px] my-[30px] mx-auto shadow-[0px_2px_2px_rgba(0,0,0,0.3)] rounded-[3px]">
            <form className="flex flex-col p-[30px] " onSubmit={register}>
            <h2 className="text-center text-[2rem] mt-[10px] mb-[25px] text-gray-500 font-[500]">Register</h2>
                <input onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="text" name="UserName" placeholder="Username"></input>
                <input onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="password" name="Password" placeholder="Password"></input>
                <input onChange={inputter} className="w-[18rem] bg-[#f2f2f2] mb-[1rem] h-[40px] pl-[10px]" type="number" name="MobileNumber" placeholder="MobileNumber"></input>
                <button className="bg-blue-600 w-[18rem] h-[40px] text-white text-[16px] font-bold mb-[1rem] rounded-[2px]" type="submit">Register</button>
                <p className="text-center text-gray-500">Already have an Account?</p>
                <Link to="/login">
                <button className="bg-yellow-500 w-[18rem] h-[40px] text-white text-[16px] font-bold mb-[1rem] rounded-[2px]">Login</button>
                </Link>
            </form>
            </div>

        </div>
    )
}