// ✅ Phase 5: Service Routes (routes/serviceRoutes.js)
const express = require('express');
const router = express.Router();
const {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');
const { single } = require('../middlewares/uploadMiddleware');
const protectAdmin = require('../middlewares/authMiddleware');

router.get('/', getServices);
router.get('/:id', getServiceById);

router.post('/', protectAdmin, single('image'), createService);
router.put('/:id', protectAdmin, single('image'), updateService);
router.delete('/:id', protectAdmin, deleteService);

module.exports = router;