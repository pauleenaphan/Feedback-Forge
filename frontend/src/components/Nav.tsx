import { Link } from 'react-router-dom';
import { FaUser, FaHome } from "react-icons/fa";
import { GiAnvil } from "react-icons/gi";

import ffLogo from "../assets/ffLogo.png";

export const Navbar = () => {
    const isLogged = localStorage.getItem("ffisLogged");

    return (
        <nav className="py-3 px-5 text-white flex justify-between border-b border-gray-300">
            <Link to="/">
                <div className="flex items-center gap-2">
                    <img className="w-[6%]" src={ffLogo} alt="FeedbackForge Logo" />
                    <h1 className="text-2xl text-black font-medium mb-2"> FeedbackForge </h1>
                </div>
            </Link>
            

            <div className="flex items-center gap-5">
                <Link to="/allProjects">
                    <FaHome className="text-3xl text-black hover:text-blue-500" />
                </Link>
                <Link to={isLogged ? "/userProjects" : "/signup"}>
                    <GiAnvil className="text-4xl text-black hover:text-blue-500" />
                </Link>
                <Link to={isLogged ? "/profile" : "/signup"}>
                    <FaUser className="text-2xl text-black hover:text-blue-500" />
                </Link>
            </div>
        </nav>
    );
};
