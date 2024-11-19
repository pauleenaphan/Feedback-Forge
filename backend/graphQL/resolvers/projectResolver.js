const Project = require("../models/projectModel");

const projectResolver = {
    Query:{
        getProject: async(_, { id })=>{
            try{
                const project = await Project.findById(id);
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
                const projects = await Project.find();
                return projects;
            }catch(error){
                throw new Error(error.message);
            }
        }
    },

    Mutation:{
        createProject: async(_, { input }) =>{
            try{
                const newProject = new Project({
                    owner: input.owner,
                    name: input.name,
                    description: input.description,
                    techStack: input.techStack,
                    datePosted: input.datePosted,
                    githubLink: input.githubLink,
                    liveSiteLink: input.liveSiteLink,
                })

                await newProject.save();
            }catch(error){
                throw new Error("Error creating project")
            }
        },
        editProject: async(_, { input }) =>{
            try{
                const project = await Project.findByIdAndUpdate(input._id);

                if(!project){
                    throw new Error("Project not found");
                }

                const updatedProject = await Project.findByIdAndUpdate(
                    input._id, 
                    {
                        $set: {
                            name: input.name,
                            description: input.description,
                            techStack: input.techStack,
                            githubLink: input.githubLink,
                            liveSiteLink: input.liveSiteLink,
                        },
                    },
                    { new: true } // Return the updated document
                )

                return updatedProject;
            }catch(error){
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

        addComment: async(_, { input }) =>{
            try{
                const project = await Project.findById(input._id);

                if(!project){
                    throw new Error("project not found");
                }

                const newComment = {
                    user: input.user,
                    description: input.description,
                    datePosted: input.datePosted,
                }

                project.comments.push(newComment);
                await project.save();
                return newComment;
            }catch(error){
                throw new Error("Error adding new comment");
            }
        }
    }
}

module.exports = projectResolver;