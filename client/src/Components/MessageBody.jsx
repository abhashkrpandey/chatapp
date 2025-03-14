import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function MessageBody({ obj, userid, recepientid, visibleIds, setVisibleIds }) {
    const localRef = useRef(null);
    const { ref: inViewRef, inView } = useInView({ triggerOnce: true });

    function setRefs(el) {
        localRef.current = el;
        inViewRef(el);
    }

    useEffect(() => {
        if (inView && localRef.current && obj.userid !== userid && obj.recepientid !== recepientid) {
            const messageId = localRef.current.id;
            setVisibleIds((prevIds) => (prevIds.includes(messageId) ? prevIds : [...prevIds, messageId]));
        }
    }, [inView]);

    const isSender = userid === obj.userid && recepientid === obj.recepientid;
    const bgColor = isSender ? "bg-green-700" : "bg-green-500";
    const paddingClass = isSender ? "pl-[0.25rem] pr-[2.25rem]" : "pl-[2.25rem] pr-[0.25rem]";
    const flexClass = isSender ? "flex-row-reverse" : "";

    return (
        <div ref={setRefs} id={obj._id} className={`flex ${flexClass} mt-[2%]`}>
            <div className={`${bgColor} ${paddingClass} rounded-md`}>
                <div className="text-white">{obj.message}</div>
                <div className="flex flex-row-reverse text-white">
                    {obj.messageDate} at {obj.messageTime}
                </div>
            </div>
        </div>
    );
}
