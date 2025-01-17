import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { FaGithubSquare, FaRegCommentAlt, FaExternalLinkAlt } from "react-icons/fa";
import { useQuery } from '@apollo/client';
import { GET_ALL_PROJECTS } from "../services/ProjectAPI";

import { Project } from '../types/project';

import ProjectModal from '../components/projectModal';

import ffIcon from "../assets/ffIcon.png";

export const Homepage = () => {
    const navigate = useNavigate();
    const isLogged = localStorage.getItem("ffisLogged");

    const [currProject, setCurrProject] = useState<string>("");
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    const { loading, error, data } = useQuery(GET_ALL_PROJECTS);
    if (loading) return <div>Loading projects...</div>;
    if (error) return <div>Error: {error.message}</div>;

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
                        <button 
                            onClick={() => navigate("/signup")}
                            className="bg-blue-500 text-white font-medium px-5 py-2 rounded-2xl shadow-custom-blue hover:shadow-none transform hover:translate-y-3 hover:opacity-90"
                        >
                            Get Started!
                        </button>
                    )}

                    <button className="underline hover:opacity-80"> Receive and give feedback </button>
                </div>
            </header>

            <section className="flex justify-center flex-wrap gap-5">
                {/* Map over all projects */}
                {data.getAllProjects.map((project: Project) => (
                    <article 
                        key={project._id} 
                        className="bg-gray-100 p-5 rounded-lg flex flex-col gap-3 w-1/4 hover:scale-105 transition-transform cursor-pointer"
                        onClick={() =>{ 
                            setCurrProject(project._id);
                            setIsProjectModalOpen(true);
                        }}
                    >
                        <div className="flex justify-between border-b-2 border-black pb-2 items-center">
                            <p className="font-heading font-bold text-xl">@{project.owner.username}</p>
                            <p>{project.datePosted}</p>
                        </div>
                        <div>
                            <h2 className="font-medium text-lg">{project.name}</h2>
                            <p className="text-gray-700">{project.shortDescription}</p>
                        </div>
                        <p>{project.techStack.join(', ')}</p>
                        <div className="flex justify-between text-2xl items-center">
                            <div className="flex gap-1 items-center">
                                {/* Links must be in the form of a full link (https://...) in order to open correctly */}
                                <a href={project.liveSiteLink} target="_blank" rel="noopener noreferrer">
                                    <FaExternalLinkAlt className="text-2xl hover:opacity-70 cursor-pointer" />
                                </a>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                    <FaGithubSquare className="text-3xl hover:opacity-70 cursor-pointer" />
                                </a>
                            </div>
                            <FaRegCommentAlt className="text-2xl hover:opacity-70 cursor-pointer" />
                        </div>
                    </article>
                ))}
            </section>

            <ProjectModal isOpen={isProjectModalOpen} onClose={() =>{setIsProjectModalOpen(false)}} projectId={currProject}></ProjectModal>
        </main>
    );
};
