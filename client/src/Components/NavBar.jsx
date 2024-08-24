import { Link } from 'react-router-dom';
export default function NavBar() {
    return (
        <>
            <div className="flex gap-3 flex-row-reverse">  {/* flex is not working*/}
                <NavComponents text="Register" route="/register"></NavComponents>
                <NavComponents text="Login" route="/login"></NavComponents>
            </div>
        </>
    )
}
function NavComponents({ text, route }) {
    return (
        <div>
            <Link to={route}>{text}</Link>
        </div>
    )
}