const jwt = require('jsonwebtoken');
const Project = require('../models/projectModel');

const projectResolver = {
    Query:{
        getProject: async(_, { id })=>{
            try{
                const project = await Project.findById(id).populate("comments").populate("owner");
                if(!project){
                    throw new Error("project not found");
                }
                return project;
            }catch(error){
                throw new Error(error.message);
            }
        },
        getAllProjects: async() =>{
            try{
                const projects = await Project.find().populate("comments").populate("owner");
                return projects;
            }catch(error){
                throw new Error(error.message);
            }
        }
    },

    Mutation:{
        createProject: async(_, { input }, { token }) =>{
            try{
                console.log("JWT_SECRET:", process.env.JWT_SECRET);
                console.log("token in resolver", token);
                if (!token) {
                    throw new Error('Authentication required');
                }

                // Verify the token (use jwt.verify or another method)
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log("Decoded user:", decoded);

                const newProject = new Project({
                    owner: decoded.userId,
                    name: input.name,
                    shortDescription: input.shortDescription,
                    longDescription: input.longDescription,
                    techStack: input.techStack,
                    datePosted: input.datePosted,
                    githubLink: input.githubLink,
                    liveSiteLink: input.liveSiteLink,
                })

                await newProject.save();
                return newProject;
            }catch(error){
                console.error("error", error);
                throw new Error("Error creating project")
            }
        },
        editProject: async(_, { input }, { token }) =>{
            try{
                if (!token) {
                    throw new Error('Authentication required');
                }

                const project = await Project.findByIdAndUpdate(input._id);

                if(!project){
                    throw new Error("Project not found");
                }

                const updatedProject = await Project.findByIdAndUpdate(
                    input._id, 
                    {
                        $set: {
                            name: input.name,
                            shortDescription: input.shortDescription,
                            longDescription: input.longDescription,
                            techStack: input.techStack,
                            githubLink: input.githubLink,
                            liveSiteLink: input.liveSiteLink,
                        },
                    },
                    { new: true } // Return the updated document
                )

                return updatedProject;
            }catch(error){
                console.error("error", error);
                throw new Error("Error updating project")
            }
        },
        deleteProject: async(_, { id }) =>{
            try{
                const project = await Project.findByIdAndDelete(id);

                if(!project){
                    throw new Error("Project was not deleted");
                }
            }catch(error){
                throw new Error("Project was not deleted");
            }
        },
    }
}

module.exports = projectResolver;