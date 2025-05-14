// ✅ Phase 4: Blog Routes (routes/blogRoutes.js)
const express = require('express');
const router = express.Router();
const {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');
const { single } = require('../middlewares/uploadMiddleware');
const protectAdmin = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Admin protected routes
router.post('/', protectAdmin, single('image'), createBlog);
router.put('/:id', protectAdmin, single('image'), updateBlog);
router.delete('/:id', protectAdmin, deleteBlog);

module.exports = router;
