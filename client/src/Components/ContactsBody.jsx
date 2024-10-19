import axios, { all } from "axios";
import { UserContext } from "../UserContext";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext1 } from "../UserContext1";
import UsertoContact from "./UsertoContact";
export default function ContactsBody({socket}) {
    const [listusers, setlistusers] = useState([]);
    const [allusers, setallusers] = useState([]);
    const { uid,status,setstatus } = useContext(UserContext);
    const [updateusers,setupdateusers]=useState([]);
    function updatedusers()
    {
        setupdateusers(allusers && allusers.length > 0 ? (
            allusers.map((ele) => {
                const matched = listusers.find((person) => person.userid == ele._id);
                const socketvalue = matched ? matched.socketid : undefined;
                return(
                <UsertoContact userid={ele._id} socketid={socketvalue} uname={ele.username} key={ele._id} active={matched!==undefined && (matched.userid===ele._id)?true:false}></UsertoContact>
                );
            })
         ) : (
            <p>No active users</p>
        ));
    }
    async function search() {
        socket.emit("status",{"uid":uid});
        socket.on("online",(args)=>{
                setlistusers(args.activeUsersdata);
        })

        socket.on("change",(args)=>{
            setlistusers(args.activeUsersdata);
        })
        socket.on("disconnect",()=>{
            setstatus(false);
        })
    }
    useEffect(() => {
        async function fetchingusers() {
            const totalusers = await axios.get(process.env.REACT_APP_BACKEND_URL+"/totalusers");
            setallusers(totalusers.data.allusersdata);
        }
        fetchingusers();
    }
        , []);
    useEffect(() => {
            search();
            return ()=>
            {
                socket.off("disconnect");
                socket.off("online");
                socket.off("change");
                socket.off("status");
            }
    }, []);
    useEffect(()=>
    {
        updatedusers();
    },[listusers]);
    return (
        <>
            {/* <div className="flex flex-row">
                <button className="bg-gray-500 w-full" onClick={search}>Press for active users</button>
            </div> */}
            <div>
                {
                updateusers
                }
            </div>
        </>
    )
}