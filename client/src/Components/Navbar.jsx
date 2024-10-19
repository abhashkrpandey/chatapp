import { Link } from 'react-router-dom';
export default function NavBar() {
    return (
        <>
            <div className='flex justify-between m-5 '>
                <div className='flex text-2xl'>
                    <span className='font-bold'>chat</span>app
                </div>
                <div className="flex gap-3 flex-row-reverse text-lg font-sans">
                    <NavComponents text="Register" route="/register"></NavComponents>
                    <NavComponents text="Login" route="/login"></NavComponents>
                </div>
            </div>
        </>
    )
}
function NavComponents({ text, route }) {
    return (
        <div className='rounded-full p-2 hover:bg-white hover:text-black'>
            <Link to={route}>{text}</Link>
        </div>
    )
}
