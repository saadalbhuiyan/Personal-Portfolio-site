const express = require('express');
const router = express.Router();

const {
    getTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');

const { single } = require('../middlewares/uploadMiddleware');
const protectAdmin = require('../middlewares/authMiddleware');

router.get('/', getTestimonials);

router.get('/:id', getTestimonialById);

router.post('/', protectAdmin, single('image'), createTestimonial);

router.put('/:id', protectAdmin, single('image'), updateTestimonial);

router.delete('/:id', protectAdmin, deleteTestimonial);

module.exports = router;
