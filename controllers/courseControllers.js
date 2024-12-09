const db = require('../models');
const Course = db.course;

const courseController = {
    async createCourse(req, res) {
        try {
            const newCourse = await Course.create(req.body);
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCourses(req, res) {
        try {
            const courses = await Course.findAll();
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCourseById(req, res) {
        try {
            const course = await Course.findByPk(req.params.id);
            if (!course) return res.status(404).json({ message: 'Course not found' });
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateCourse(req, res) {
        try {
            const course = await Course.findByPk(req.params.id);
            if (!course) return res.status(404).json({ message: 'Course not found' });

            await course.update(req.body);
            res.status(200).json({ message: 'Course updated successfully', course });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteCourse(req, res) {
        try {
            const course = await Course.findByPk(req.params.id);
            if (!course) return res.status(404).json({ message: 'Course not found' });

            await course.destroy();
            res.status(200).json({ message: 'Course deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
};

module.exports = courseController;
