import { useNavigate } from 'react-router-dom';

import { CgWebsite } from "react-icons/cg";
import { FaGithubSquare, FaRegCommentAlt, FaExternalLinkAlt } from "react-icons/fa";

import ffIcon from "../assets/ffIcon.png";

export const Homepage = () => {
    const navigate = useNavigate();
    const isLogged = localStorage.getItem("ffisLogged");

    return (
        <main className="font-body flex flex-col gap-20 my-10">
            <header className="flex justify-center flex-col items-center gap-3 mx-auto w-2/3">
                <div className="flex flex-col items-center">
                    <img src={ffIcon} className="w-1/6"/>
                    <h1 className="font-heading text-5xl font-bold text-gray-900 text-center"> 
                        Share Your GitHub Projects, Receive Feedback, and Grow Your Skills
                    </h1>
                </div>
                
                <p className="text-lg text-gray-600">Receive feedback on your projects today from people around the world!</p>

                {/* Conditional rendering based on login status */}
                <div className="flex justify-center gap-3 items-end">
                    {isLogged ? (
                        <button onClick={() => console.log("Open Add Project Modal")}>
                            Add Your Project
                        </button>
                    ) : (
                        <button 
                            onClick={() => navigate("/signup")}
                            className="bg-blue-500 text-white font-medium px-5 py-2 rounded-2xl shadow-custom-blue hover:shadow-none transform hover:translate-y-3 hover:opacity-90"
                        >
                            Post your Project!
                        </button>
                    )}

                    <button className="underline hover:opacity-80"> Start giving feedback </button>
                </div>
            </header>

            <section className="flex justify-center flex-wrap gap-5">
                {/* Project card */}
                <article className="bg-gray-200 p-5 rounded-lg flex flex-col gap-3 w-1/4">
                    <div className="flex justify-between border-b-2 border-black pb-2">
                        <p className="font-bold"> @Pauleena </p>
                        <p>12/20/2024</p>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg"> Meowpop </h2> 
                        <p> A mockup eccomerce site that allow users to become vendors. Vendors can manage their listings and sell items.</p>
                    </div>
                    <p> React, HTML, CSS, MongoDB</p>
                    <div className="flex justify-between text-2xl items-center">
                        <div className="flex gap-1 items-center">
                            <FaExternalLinkAlt className="text-2xl hover:opacity-70 cursor-pointer"/>
                            <FaGithubSquare className="text-3xl hover:opacity-70 cursor-pointer"/>
                        </div>
                        
                        <FaRegCommentAlt className="text-2xl hover:opacity-70 cursor-pointer"/>
                    </div>
                    
                </article>
            </section>
        </main>
    );
};
