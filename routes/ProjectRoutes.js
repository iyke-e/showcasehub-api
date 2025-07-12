// routes/ProjectRoutes.js

const express = require("express");
const router = express.Router();

const {
    getProjects,
    getProjectById,             // ✅ Fix typo here
    createProject,
    updateProject,
    deleteProject,
    getPublicProjects,
    getFeaturedProjects         // ✅ Fix typo here too
} = require("../controllers/projectController");

const requireAuth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// ✅ Protected routes
router.use(requireAuth);
router.get("/", getProjects);
router.post("/", upload, createProject);
router.get("/:id", getProjectById);
router.put("/:id", upload, updateProject);
router.delete("/:id", deleteProject);

// ✅ Public routes (must go BEFORE requireAuth or in a separate router)
router.get("/public/:userId/projects", getPublicProjects);
router.get("/public/:userId/featured", getFeaturedProjects);

module.exports = router;
