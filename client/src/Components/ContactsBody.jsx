import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UsertoContact from "./UsertoContact";
import { UserContext } from "../UserContext";
import { UserContext1 } from "../UserContext1";
import Cookies from "js-cookie";

const ContactsBody = React.memo(function ContactsBody() {
    const [allusersdata, setallusersdata] = useState([]);
    const [updateusers, setupdateusers] = useState([]);
    const { socket } = useContext(UserContext1);
    const [totalActiveUser, settotalActiveUser] = useState([]);
    const [totalNotification,setTotalNotification]=useState([]);

    useEffect(() => {
        async function totaluserscounter() {
            try {
                const totalusers = await axios.post(import.meta.env.VITE_BACKEND_URL + "/totalusers",
                    {
                        "recepientid":Cookies.get("userid") // sending as recepientid because this user is now a recevier of noifications from others
                    }
                );
                setallusersdata(totalusers.data.allusers);
                setTotalNotification(totalusers.data.allnotification);
            } catch (error) {
                console.error("Error fetching total users:", error);
            }
        }
        totaluserscounter();
    }, [totalActiveUser]);

    useEffect(() => {
        setupdateusers(() =>
            allusersdata.length > 0
                ? allusersdata.map((ele) => (
                    <UsertoContact
                        key={ele._id}
                        userid={ele._id}
                        username={ele.username}
                        activeStatus={totalActiveUser.includes(ele._id) ? "online" : "offline"}
                        newMessage={totalNotification!=null?totalNotification.includes(ele._id)?true:false:false}
                    />
                ))
                : <p>No users present</p>
        );
    }, [allusersdata, totalActiveUser]);

    useEffect(() => {

        if (socket==null)
        {
            return;
        }
        socket.emit("request-active-users");

        const handleOnlineUsers = (args) => {
            settotalActiveUser([...args.activeUsers]);
        };
        socket.on("all-online-users", handleOnlineUsers);

        return () => {
            socket.off("all-online-users", handleOnlineUsers);
        };
    }, [socket]);

    return (
        <div className="overflow-y-auto">
            {updateusers}
        </div>
    );
});

export default ContactsBody;
