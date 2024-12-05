const db = require('../models');
const course_category = db.course_category;

const courseCategoryController = {
    async createCourseCategory(req, res) {
        try {
            const newCourse = await course_category.create(req.body);
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCoursesCategory(req, res) {
        try {
            const courses = await course_category.findAll();
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCourseCategoryById(req, res) {
        try {
            const course = await course_category.findByPk(req.params.id);
            if (!course) return res.status(404).json({ message: 'Course not found' });
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateCourseCategory(req, res) {
        try {
            const course = await course_category.findByPk(req.params.id);
            if (!course) return res.status(404).json({ message: 'Course not found' });

            await course.update(req.body);
            res.status(200).json({ message: 'Course updated successfully', course });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteCourseCategory(req, res) {
        try {
            const course = await course_category.findByPk(req.params.id);
            if (!course) return res.status(404).json({ message: 'Course not found' });

            await course.destroy();
            res.status(200).json({ message: 'Course deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = courseCategoryController;
