import { Link } from "react-router-dom";

export default function NotLoggined() {
    return (
        <div className="bg-blue-500 h-screen  flex justify-center">
            <div className="bg-white h-[390px] w-[350px] my-[30px] mx-auto shadow-[0px_2px_2px_rgba(0,0,0,0.3)] rounded-[3px]">
            <h2 className="text-center text-[2rem] mt-[10px] mb-[25px] text-gray-500 font-[500]">Warning</h2>
                <div className="flex flex-col p-[30px] ">
                    <p className="text-gray-500 mb-[1rem]">You are either not loggined or signed</p>
                <Link to="/login">
                    <button className="bg-blue-600 w-[18rem] h-[40px] text-white text-[16px] font-bold rounded-[2px] mb-[1rem]">
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button className="bg-yellow-500 w-[18rem] h-[40px] text-white text-[16px] font-bold rounded-[2px] mb-[1rem]">
                        Register
                    </button>
                </Link>
                </div>
            </div>
        </div>
    )
}