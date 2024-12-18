const db = require('../models');
const Course = db.course;
const CourseImage = db.course_image;
const CourseContent = db.course_content;

const courseController = {
    async createCourse(req, res) {

        try {
            const { title, description, price, level, instructor_id, category,details  } = req.body;

            if (level && !['beginner', 'intermediate', 'advanced'].includes(level)) {
                return res.status(400).json({ error: 'Invalid course level' });
            }
            const newCourse = await Course.create(
                {
                    instructor_id,
                    title,
                    description,
                    category,
                    price,
                    level, // Optional: Default value will be used if not provided
                    details 
                }
            );
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCourses(req, res) {
        try {
            const courses = await Course.findAll(
                {
                    include: {
                        model: CourseImage,
                        required: true, // This makes it an INNER JOIN
                        attributes: ['id', 'course_id', 'image', 'description'] // Specify the attributes you want from CourseImage
                    },
                    order: [['id', 'ASC']],
                }
            );
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCourseById(req, res) {
        try {
            const course = await Course.findByPk(req.params.id, {
                include: [
                    {
                        model: CourseImage, // Include the related model
                        required: false, // Use LEFT JOIN, set `true` for INNER JOIN
                        attributes: ['image'] // Specify the fields you want
                    },
                    {
                        model: CourseContent,
                        required: false, // LEFT JOIN
                        attributes: ['id', 'content_type', 'title', 'description', 'file_url', 'content_order', 'duration']
                    }
                ],
            }
            );
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
