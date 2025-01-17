import { Link } from 'react-router-dom';

import ffIcon from "../assets/ffIcon.png";

export const Homepage = () => {
    const isLogged = localStorage.getItem("ffisLogged");

    return (
        <main className="font-body flex flex-col gap-20 my-10">
            <header className="flex justify-center flex-col items-center gap-3 mx-auto w-2/3">
                <div className="flex flex-col items-center">
                    <img src={ffIcon} className="w-1/6"/>
                    <h1 className="font-heading text-5xl font-bold text-gray-800 text-center"> 
                        Share Your GitHub Projects, Receive Feedback, and Grow Your Skills
                    </h1>
                </div>
                
                <p className="text-lg text-gray-500">Receive feedback on your projects today from people around the world!</p>

                {/* Conditional rendering based on login status */}
                <div className="flex justify-center gap-3 items-end">
                    {isLogged ? (
                        <button onClick={() => console.log("Open Add Project Modal")}>
                            Add Your Project
                        </button>
                    ) : (
                        <Link to="/allProjects">
                            <button className="bg-blue-500 text-white font-medium px-5 py-2 rounded-2xl shadow-custom-blue hover:shadow-none transform hover:translate-y-3 hover:opacity-90">
                                Get Started!
                            </button>
                        </Link>
                        
                    )}

                    <button className="underline hover:opacity-80"> Receive and give feedback </button>
                </div>
            </header>
        </main>
    );
};
