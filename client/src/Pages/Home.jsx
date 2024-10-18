import NavBar from '../Components/Navbar';
import React from 'react';
import logo from '../assets/newer.png'
export default function Home() {
    return (
        <div className=' bg-blue-500 h-screen flex flex-col gap-3 text-white' >
            <NavBar></NavBar>
            <div className='flex justify-between'>
            <div className='w-128 text-5xl font-bold ml-5 h-56 leading-relaxer'>
                Connecting Conversations AnyTime,Anywhere
            </div>
            <div className='w-[500px] h-[500px] mr-10'>
                <img src={logo} alt="Logo" className='rounded-full h-[500px]'></img>
            </div>
            </div>
        </div>
    );
}
