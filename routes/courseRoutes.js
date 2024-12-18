const express = require('express');
const courseController = require('../controllers/courseControllers');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/authorizeAdmin');

const router = express.Router();

router.post('/courses', authMiddleware,authorizeAdmin,courseController.createCourse);
router.get('/courses', authMiddleware,courseController.getCourses);
router.get('/courses/:id', authMiddleware,courseController.getCourseById);
router.put('/courses/:id', authMiddleware,authorizeAdmin,courseController.updateCourse);
router.delete('/courses/:id', authMiddleware,authorizeAdmin, courseController.deleteCourse);

module.exports = router;