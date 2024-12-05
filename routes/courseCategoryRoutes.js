const express = require('express');
const courseCategoriesController = require('../controllers/courseCategoriesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/courses-category', authMiddleware,courseCategoriesController.createCourseCategory);
router.get('/courses-category', authMiddleware,courseCategoriesController.getCoursesCategory);
router.get('/courses-category/:id', authMiddleware,courseCategoriesController.getCourseCategoryById);
router.put('/courses-category/:id', authMiddleware,courseCategoriesController.updateCourseCategory);
router.delete('/courses-category/:id', authMiddleware, courseCategoriesController.deleteCourseCategory);

module.exports = router;
