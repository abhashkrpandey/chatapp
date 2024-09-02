import { UserContextProvider1 } from "../UserContext1";
import ChatAppContainer from "../Components/ChatAppConatiner";

export default function ChatApp() {

    return (
        <UserContextProvider1 >
             <ChatAppContainer></ChatAppContainer>
        </UserContextProvider1>
    )
}