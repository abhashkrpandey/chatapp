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
       const data= await axios.post("http://localhost:3000/register",{
            userName,password,number});
            setuname(data.data.uname);
            setuid(data.data.id);
            setunumber(data.data.number);
         const data1=await axios.get("http://localhost:3000/profile");
         if(data1.data.redirect)
         {
            navigate(data1.data.redirect);
         }
    }
    return (
        <div className="bg-slate-300 h-screen ">
            <form className="flex flex-col items-center justify-center gap-3" onSubmit={register}>
                <input onChange={inputter} className="w-56" type="text" name="UserName" placeholder="Username"></input>
                <input onChange={inputter} className="w-56" type="password" name="Password" placeholder="Password"></input>
                <input onChange={inputter} className="w-56" type="number" name="MobileNumber" placeholder="MobileNumber"></input>
                <button className="bg-blue-600 w-56" type="submit">Register</button>
                <p>Already have an Account?</p>
                <Link to="/login">
                <button className="bg-yellow-500 w-56">Login</button>
                </Link>
            </form>

        </div>
    )
}