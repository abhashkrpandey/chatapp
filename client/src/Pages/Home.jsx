import NavBar from '../Components/Navbar';
import React from 'react';
import logo from '../assets/newer.png'
export default function Home() {
    return (
        <div className=' bg-blue-500 h-lvh flex flex-col gap-3 text-white' >
            <NavBar></NavBar>
            <div className='flex justify-between'>
                <div className='lg:w-128 sm:w-80  lg:text-5xl sm:text-2xl font-bold ml-5 h-56 leading-relaxer'>
                    Connecting Conversations AnyTime,AnyWhere
                </div>
                <div className='lg:w-[500px] lg:h-[500px] md:w-[300px] md:h-[300px] sm:w-[200px] sm:h-[200px] lg:mr-10 md:mr-8 sm:mr-5'>
                    <img src={logo} alt="Logo" className='rounded-full sm:h-[200px] lg:h-[500px] md:h-[300px]'></img>
                </div>
            </div>
        </div>
    );
}
