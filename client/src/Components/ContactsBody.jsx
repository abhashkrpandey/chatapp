import axios from "axios";
import { UserContext } from "../UserContext";
import { useContext, useRef, useState } from "react";
import { UserContext1 } from "../UserContext1";
import UsertoContact from "./UsertoContact";
export default function ContactsBody() {
    // const { socket} = useContext(UserContext1);
    const [listusers, setlistusers] = useState([]);
    //  const nameref = useRef(null);
    async function search() {
        //const searchedname = nameref.current.value;
        const searchedusers = await axios.get("http://localhost:3000/activeusers");
        //  console.log(searchedusers.data.activeUsersdata);
        setlistusers(searchedusers.data.activeUsersdata);
    }
    return (
        <>
            <div className="flex flex-row">
                {/* <input ref={nameref} type="text"  placeholder="Search the username" className="border-2 border-black w-5/6"></input>
                <button className="bg-gray-500 w-1/6" onClick={search}>Search the active users</button> */}
                <button className="bg-gray-500 w-1/6" onClick={search}>Refresh for active users</button>
                {/* <button>Message</button> */}
            </div>
            <div>
                {listusers && listusers.length > 0 ? (
                    listusers.map((ele) => (
                        // <div key={ele.uid} className="flex flex-row justify-between">
                        //     <p>Name:{ele.uname}</p>
                        //     <p>SocketId:{ele.socketid}</p>
                        //     <button>Select</button>
                        // </div>
                        <UsertoContact uid={ele.uid} socketid={ele.socketid} uname={ele.uname} key={ele.uid}></UsertoContact>
                    ))
                ) : (
                    <p>No active users</p>
                )}
            </div>


        </>
    )
}