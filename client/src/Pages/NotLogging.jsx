import { Link } from "react-router-dom";

export default function NotLoggined()
{
    return(
        <>
        <div>You are either not loggined or signed</div>
        <Link to="/login">
        <button>
            Login
        </button>
        </Link>
        <Link to="/register">
        <button>
            Register
        </button>
        </Link>
        </>
    )
}