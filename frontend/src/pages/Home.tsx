import { useNavigate } from 'react-router-dom';

import { CgWebsite } from "react-icons/cg";
import { FaGithubSquare, FaRegCommentAlt } from "react-icons/fa";

export const Homepage = () => {
    const navigate = useNavigate();
    const isLogged = localStorage.getItem("ffisLogged");

    return (
        <main className="flex flex-col gap-10">
            <header className="flex justify-center flex-col items-center gap-5 mt-20">
                <h1 className="text-5xl font-bold">Feedback Forge</h1>
                <p className="text-md">Receive feedback on your projects today from people around the world!</p>
            </header>
            
            {/* Conditional rendering based on login status */}
            <div className="flex justify-center gap-3 items-end">
                {isLogged ? (
                    <button onClick={() => console.log("Open Add Project Modal")}>
                        Add Your Project
                    </button>
                ) : (
                    <button 
                        onClick={() => navigate("/signup")}
                        className="bg-gray-200 px-5 py-2 rounded-lg shadow-custom-gray hover:shadow-none transform hover:translate-y-1"
                    >
                        Post your Project!
                    </button>
                )}

                <button className="underline"> Start giving feedback </button>
            </div>
            

            <section className="flex justify-center flex-wrap gap-5">
                {/* Project card */}
                <article className="bg-gray-200 p-5 rounded-lg flex flex-col gap-3 w-1/4">
                    <div className="flex justify-between">
                        <p className="font-bold"> User </p>
                        <p>Date Posted</p>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">Project Name</h2> 
                        <p>Project Description</p>
                    </div>
                    <p>Tech Stack</p>
                    <div className="flex justify-between text-2xl">
                        <div className="flex gap-1">
                            <CgWebsite />
                            <FaGithubSquare />
                        </div>
                        
                        <FaRegCommentAlt />
                    </div>
                    
                </article>
            </section>
        </main>
    );
};
