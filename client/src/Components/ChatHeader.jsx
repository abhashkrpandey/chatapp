import { useContext, useEffect, useState } from "react"
import { UserContext1 } from "../UserContext1"

export default function ChatHeader()
{
      const {recepientname}=useContext(UserContext1);
      return(
           <div className="font-bold text-xl h-[5%]">
            <p>{recepientname}</p>
          </div>
      )
}