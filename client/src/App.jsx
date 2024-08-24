import { Route, Routes } from 'react-router-dom';
import Register from "./Pages/Register"
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ChatApp from "./Pages/ChatApp";
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {
    axios.defaults.baseURL="http://localhost:5173"
    axios.defaults.withCredentials=true;

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
         <Route path="/register" element={<Register/>}></Route>
         <Route path="/profile" element={<ChatApp/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </UserContextProvider>
      
  )
}

export default App
