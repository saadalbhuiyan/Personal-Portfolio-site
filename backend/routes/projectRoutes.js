const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const { single } = require('../middlewares/uploadMiddleware');
const protectAdmin = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin protected routes
router.post('/', protectAdmin, single('image'), createProject);
router.put('/:id', protectAdmin, single('image'), updateProject);
router.delete('/:id', protectAdmin, deleteProject);

module.exports = router;
