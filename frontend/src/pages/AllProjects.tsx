import { useState } from 'react';

import { FaGithubSquare, FaRegCommentAlt, FaExternalLinkAlt } from "react-icons/fa";
import { useQuery } from '@apollo/client';
import { GET_ALL_PROJECTS } from "../services/ProjectAPI";

import { Project } from '../types/project';

import ProjectModal from '../components/projectModal';

export const AllProjects = () =>{
    const [currProject, setCurrProject] = useState<string>("");
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    const { loading, error, data } = useQuery(GET_ALL_PROJECTS);
    if (loading) return <div>Loading projects...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return(
        <main>
            <section className="flex justify-center flex-wrap gap-5">
                {/* Map over all projects */}
                {data.getAllProjects.map((project: Project) => (
                    <article 
                        key={project._id} 
                        className="bg-gray-100 p-5 rounded-lg flex flex-col gap-3 w-1/4 hover:scale-105 hover:border-4 border-blue-500 transition-transform cursor-pointer"
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
                                    <FaExternalLinkAlt className="text-2xl hover:text-blue-500 cursor-pointer" />
                                </a>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                    <FaGithubSquare className="text-3xl hover:text-blue-500 cursor-pointer" />
                                </a>
                            </div>
                            <FaRegCommentAlt className="text-2xl hover:text-blue-500 cursor-pointer" />
                        </div>
                    </article>
                ))}
            </section>

            <ProjectModal isOpen={isProjectModalOpen} onClose={() =>{setIsProjectModalOpen(false)}} projectId={currProject}></ProjectModal>
        </main>
    )
}