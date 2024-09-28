import axios from "axios";
import { UserContext } from "../UserContext";
import { useContext, useRef, useState } from "react";
import { UserContext1 } from "../UserContext1";
import UsertoContact from "./UsertoContact";
export default function ContactsBody() {
    const [listusers, setlistusers] = useState([]);
    const {uid} =useContext(UserContext);
    async function search() {
        const searchedusers = await axios.get("http://localhost:3000/activeusers");
        // console.log(searchedusers.data.activeUsersdata);
        // searchedusers.data.activeUsersdata=searchedusers.data.activeUsersdata.filter(person=>person.userid!=uid);
        setlistusers(searchedusers.data.activeUsersdata);
    }
    return (
        <>
            <div className="flex flex-row">
                <button className="bg-gray-500 w-1/6" onClick={search}>Refresh for active users</button>
            </div>
            <div>
                {listusers && listusers.length > 0 ? (
                    listusers.map((ele) => (
                        <UsertoContact userid={ele.userid} socketid={ele.socketid} uname={ele.uname} key={ele.userid}></UsertoContact>
                    ))
                ) : (
                    <p>No active users</p>
                )}
            </div>


        </>
    )
}