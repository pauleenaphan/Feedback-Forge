const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    longDescription: { type: String, required: true },
    techStack: [{ type: String, required: true }],
    datePosted: { type: String, required: true },
    githubLink: { type: String, required: true },
    liveSiteLink: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }] 
})

module.exports = mongoose.model("Project", projectSchema);