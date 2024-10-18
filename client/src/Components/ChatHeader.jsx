import { useContext, useEffect, useState } from "react"
import { UserContext1 } from "../UserContext1"

export default function ChatHeader()
{
      const {recepientname}=useContext(UserContext1);
      return(
           <div className=" bg-blue-600 h-[10%] font-bold text-xl flex">
            <div className="text-white flex items-center justify-center ml-[1%]">{recepientname}</div>
          </div>
      )
}