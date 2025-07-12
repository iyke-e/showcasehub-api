const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    techStack: [String],
    githubUrl: String,
    liveUrl: String,
    mainImage: String,
    additionalImages: [String],
    isFeatured: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });


module.exports = mongoose.model("Project", projectSchema)