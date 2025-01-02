import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

export const Navbar = () =>{
    const navigate = useNavigate();

    const isLogged = localStorage.getItem("ffisLogged");

    return(
        <nav className="bg-green-900 p-2 text-white flex justify-end gap-5">
            <button onClick={() => {navigate("/")}}> Home icon </button>
            <button
            onClick={() => {
                if (isLogged) {
                    navigate("/profile");
                } else {
                    navigate("/signup");
                }
            }}
            >
            <FaUser className="text-3xl" />
        </button>
        </nav>
    )
}