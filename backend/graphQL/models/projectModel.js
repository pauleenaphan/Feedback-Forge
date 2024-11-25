const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String, required: true }],
    datePosted: { type: String, required: true },
    githubLink: { type: String, required: true },
    liveSiteLink: { type: String },
    comments: [{ 
        user: { type: String },
        description: { type: String },
        datePosted: { type: String }
    }]
})

module.exports = mongoose.model("Project", projectSchema);