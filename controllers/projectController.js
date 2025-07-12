const Project = require("../models/Project")
const cloudinary = require("../utils/cloudinary")

const createProject = async (req, res, next) => {
    try {
        const {
            title,
            description,
            techStack,
            githubUrl,
            liveUrl,
            isFeatured
        } = req.body

        const techArray = Array.isArray(techStack)
            ? techStack
            : techStack?.split(",").map(t => t.trim())

        const userId = req.user._id

        let mainImageUrl = null;
        if (req.files?.mainImage?.[0]) {
            const result = await cloudinary.uploader.upload_stream(
                { folder: "showcasehub/projects" },
                (error, result) => {
                    if (error) throw error;
                    mainImageUrl = result.secure_url
                }
            ).end(req.files.mainImage[0].buffer)
        }

        let additionalImagesUrls = []
        if (req.files?.additionalImages?.length > 0) {
            for (const file of req.files.additionalImages) {
                await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: "showcasehub/projects" },
                        (eror, result) => {
                            if (error) return reject(error)
                            additionalImagesUrls.push(result.secure_url)
                            resolve()
                        }
                    ).end(file.buffer)
                })
            }
        }

        const project = await Project.create({
            userId,
            title,
            description,
            techStack: techArray,
            githubUrl,
            liveUrl,
            mainImage: mainImageUrl,
            additionalImages: additionalImagesUrls,
            isFeatured: isFeatured === "true"
        })

        res.status(201).json(project)
    } catch (err) {
        next(err)
    }
}


const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({ userId: req.user._id }).sort({ createdAt: -1 })
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
}


const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findOne({ _id: req.params.id, userId: req.user._id })
        if (!project) return res.status(404).json({ message: "Project not found" })
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
}

const updateProject = async (req, res, next) => {
    try {
        const existing = await Project.findOne({ _id: req.params.id, userId: req.user._id })
        if (!existing) return res.status(404).json({ message: "Project not found" })

        const {
            title,
            description,
            techStack,
            githubUrl,
            liveUrl,
            isFeatured
        } = req.body

        const techArray = Array.isArray(techStack)
            ? techStack
            : techStack?.split(",").map(t => t.trim())

        if (req.files?.mainImage?.[0]) {
            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "showcasehub/projects" },
                    (error, result) => {
                        if (error) return reject(error)
                        existing.mainImage = result.secure_url
                        resolve()
                    }
                ).end(req.files.mainImage[0].buffer)
            })
        }


        if (req.files?.additionalImages?.length > 0) {
            for (const file of req.files.additionalImages) {
                await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: "showcasehub/projects" },
                        (error, result) => {
                            if (error) return reject(error)
                            existing.additionalImages.push(result.secure_url)
                            resolve()
                        }
                    ).end(file.buffer)

                })
            }
        }


        existing.title = title ?? existing.title
        existing.description = description ?? existing.description
        existing.techStack = techArray ?? existing.techStack
        existing.githubUrl = githubUrl ?? existing.githubUrl
        existing.liveUrl = liveUrl ?? existing.liveUrl
        existing.isFeatured = isFeatured ?? existing.isFeatured

        const updated = await existing.save()
        res.status(200).json(updated)

    } catch (err) {
        next(err)
    }
}

const deleteProject = async (req, res, next) => {
    try {
        const deleted = await Project.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!deleted) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        next(err);
    }
};

const getPublicProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
};

const getFeaturedProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({
            userId: req.params.userId,
            isFeatured: true
        }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getPublicProjects,
    getFeaturedProjects
};