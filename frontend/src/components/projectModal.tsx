import { useEffect, useState } from "react";
import { GET_PROJECT } from "../services/ProjectAPI";
import { useQuery } from "@apollo/client";
import { FaGithubSquare, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
}

const ProjectModal = ({ isOpen, onClose, projectId }: ProjectModalProps) => {
    const [isAnimating, setIsAnimating] = useState(false); // Controls animation
    const [isVisible, setIsVisible] = useState(false); // Controls visibility (mounting/unmounting)

    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id: projectId },
        skip: !isOpen || !projectId,
    });

    // Open modal logic with animation
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true); // Mount modal
            setTimeout(() => setIsAnimating(true), 10); // Add sliding-up animation
        } else {
            setIsAnimating(false); // Add sliding-down animation
            setTimeout(() => setIsVisible(false), 500); // Unmount modal after animation ends
        }
    }, [isOpen]);

    // Manage body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <main
            className={`fixed w-full top-20 left-0 right-0 min-h-[100vh] bg-gray-100 rounded-tl-[80px] rounded-tr-[80px] overflow-y-auto z-[9999] py-16 transform transition-transform duration-500 ${
                isAnimating ? "translate-y-0" : "translate-y-full"
            }`}
        >
            <button
                onClick={onClose}
                className="flex justify-end w-full text-4xl mb-10 px-16"
            >
                x
            </button>
            <div className="flex flex-col gap-8 px-32">
                <div>
                    <div className="flex justify-between">
                        <div>
                            <h1 className="font-heading font-bold text-4xl pb-1">
                                {data?.getProject?.name || "Project Name"}
                            </h1>
                            <div className="flex gap-1 text-gray-800 text-md">
                                <p> Created By: {data?.getProject?.owner?.username || "N/A"} | </p>
                                <p> {data?.getProject?.datePosted || "N/A"} </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <a
                                href={data?.getProject?.liveSiteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-2 items-center hover:text-blue-500 cursor-pointer"
                            >
                                <FaExternalLinkAlt className="text-3xl" />
                                <p className="text-xl"> Live Site/Demo </p>
                            </a>
                            <a
                                href={data?.getProject?.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
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
                        {data?.getProject?.techStack.map((tech: string, index: number) => (
                            <li
                                key={index}
                                className="bg-gray-300 py-1 px-4 rounded-2xl"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-heading text-3xl pb-1"> About </h3>
                    <p> {data?.getProject?.longDescription || "N/A"} </p>
                </div>
                <h4 className="font-heading text-3xl pb-1"> Comments </h4>
            </div>
        </main>
    );
};

export default ProjectModal;
