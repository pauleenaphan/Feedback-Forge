const Project = require("../models/projectModel");
const Comment = require("../models/commentModel");

const commentResolver = {
    // Viewing comments is under project resolver
    // Auto show when users click on a project 
    Mutation:{
        addComment: async(_, { input }) =>{
            try{
                const project = await Project.findById(input.projectId);

                if(!project){
                    throw new Error("project not found");
                }

                const newComment = new Comment({
                    user: input.user,
                    description: input.description,
                    datePosted: input.datePosted,
                    project: input.projectId
                })
                
                await newComment.save();
                project.comments.push(newComment._id);
                await project.save();
                return newComment;
            }catch(error){
                throw new Error("Error adding new comment");
            }
        }
    }
}

module.exports = commentResolver;