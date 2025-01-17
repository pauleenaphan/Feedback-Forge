const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    description: { type: String, required: true},
    datePosted: { type: String, required: true},
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true}
})

module.exports = mongoose.model("Comment", commentSchema);