import { Route, Routes } from 'react-router-dom';
import Register from "./Pages/Register"
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ChatApp from "./Pages/ChatApp";
import Login from './Pages/Login';
import Home from './Pages/Home';
import NotLoggined from './Pages/NotLogging';

function App() {
    axios.defaults.baseURL="https://chatapp-1-5yi5.onrender.com"
    axios.defaults.withCredentials=true;

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
         <Route path="/register" element={<Register/>}></Route>
         <Route path="/inside" element={<ChatApp/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/notidentified" element={<NotLoggined/>}></Route>
      </Routes>
    </UserContextProvider>
      
  )
}

export default App
