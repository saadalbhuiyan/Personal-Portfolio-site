// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createProject } = require('../controllers/projectController');

router.post('/add', authMiddleware, createProject);
