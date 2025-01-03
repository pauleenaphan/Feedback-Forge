import { useNavigate } from 'react-router-dom';
import { FaUser, FaHome  } from "react-icons/fa";

import ffLogo from "../assets/ffLogo.png";

export const Navbar = () =>{
    const navigate = useNavigate();

    const isLogged = localStorage.getItem("ffisLogged");

    return(
        <nav className="py-3 px-5 text-white flex justify-between">
            <div className="flex items-center gap-2">
                <img className="w-[6%]" src={ffLogo}/>
                <h1 className="text-2xl text-black font-medium mb-2"> FeedbackForge </h1>
            </div>
            
            <div className="flex items-center gap-5">
                <button onClick={() => {navigate("/")}}> <FaHome className="text-3xl text-black"/> </button>
                <button
                onClick={() => {
                    if (isLogged) {
                        navigate("/profile");
                    } else {
                        navigate("/signup");
                    }
                }}
                >
                    <FaUser className="text-2xl text-black" />
                </button>
            </div>
        </nav>
    )
}