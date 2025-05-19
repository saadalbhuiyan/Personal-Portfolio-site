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

router.get('/', getProjects);
router.get('/:id', getProjectById);

router.post('/', protectAdmin, single('image'), createProject);
router.put('/:id', protectAdmin, single('image'), updateProject);
router.delete('/:id', protectAdmin, deleteProject);

module.exports = router;
