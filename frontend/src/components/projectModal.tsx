import { useEffect } from "react";
import { GET_PROJECT } from "../services/ProjectAPI";
import { useQuery } from "@apollo/client";

import { FaGithubSquare, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectModalProps {
    isOpen: boolean; // Controls whether the modal is visible
    onClose: () => void; // Function to close the modal
    projectId: string;
}

const ProjectModal = ({ isOpen, onClose, projectId }: ProjectModalProps) => {

    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id: projectId },
        skip: !isOpen || !projectId,
    });

    // console.log('projectId:', projectId, 'isOpen:', isOpen);
    // console.log("data", data);

     // Disable scroll on body when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Disable body scroll
        } else {
            document.body.style.overflow = "auto"; // Re-enable body scroll
        }
        return () => {
            document.body.style.overflow = "auto"; // Cleanup on unmount
        };
    }, [isOpen]);

    if (!isOpen) return null;
    if (loading || !data) return <div>Loading projects...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || !data.getProject) return <p>Project not found</p>;

    const project = data.getProject;

    return (
        <main className="font-body text-lg bg-gray-100 fixed w-full mt-10 top-10 left-0 right-0 min-h-[100vh] rounded-tl-[80px] rounded-tr-[80px] overflow-y-auto z-[9999] py-16 ">
            <button onClick={onClose} className="flex justify-end w-full text-4xl mb-10 px-16"> x </button>
            <div className="flex flex-col gap-8 px-32">
                <div>
                    <div className="flex justify-between">
                        <div>
                            <h1 className="font-heading font-bold text-4xl pb-1"> {project.name} </h1>
                            <div className="flex gap-1 text-gray-800 text-md">
                                <p> Created By: {project.owner.username} | </p>
                                <p> {project.datePosted} </p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <a href={project.liveSiteLink} target="_blank" rel="noopener noreferrer" 
                                className="flex gap-2 items-center hover:text-blue-500 cursor-pointer">
                                <FaExternalLinkAlt className="text-3xl" />
                                <p className="text-xl"> Live Site/Demo </p>
                            </a>
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                                className="flex gap-1 items-center hover:text-blue-500 cursor-pointer"
                                >
                                <FaGithubSquare className="text-4xl -ml-[2px]" />
                                <p className="text-xl"> Github </p>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="font-heading text-3xl pb-1"> Tech Stack </h2>
                    <ul className="flex gap-2">
                        {project.techStack.map((tech: string, index: number) => (
                            <li key={index}
                                className="bg-gray-300 py-1 px-4 rounded-2xl"
                            >{tech}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-heading text-3xl pb-1"> About </h3>
                    <p> {project.longDescription} </p>
                </div>
                
                <h4 className="font-heading text-3xl pb-1"> Comments </h4>
            </div>
        </main>
    );
};

export default ProjectModal;