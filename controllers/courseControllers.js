const db = require('../models');
const Course = db.course;
const CourseImage = db.course_image;
const CourseContent = db.course_content;
const CourseRating = db.course_rating;
const { Sequelize } = require('../models');

const courseController = {
    async createCourse(req, res) {

        try {
            const { title, description, price, level, instructor_id, category, details } = req.body;

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

    async getCourseWithContents(req, res) {
        const courseId = req.params.id; // Assuming the course ID is passed as a route parameter

        try {
            const course = await Course.findOne({
                where: { id: courseId }, // Filter for a specific course
                include: [
                    {
                        model: CourseContent,
                        as: 'CourseContents', // Alias for the relation
                        attributes: ['id', 'content_type', 'title', 'description', 'file_url', 'content_order', 'duration'], // Select specific fields
                    },
                    {
                        model: CourseImage, // Include the related model
                        required: true, // Use LEFT JOIN, set `true` for INNER JOIN
                        attributes: ['image'] // Specify the fields you want
                    },
                    {
                        model: CourseRating,
                        attributes: [] // Avoid fetching individual ratings
                    }
                ],
            });

            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

            // Calculate average rating
          const ratings = await CourseRating.findAll({
            where: { course_id: courseId },
            attributes: [
              [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
              [Sequelize.fn('COUNT', Sequelize.col('rating')), 'totalRatings']
            ],
            raw: true // Return plain object
          });

          const averageRating = ratings[0]?.averageRating || "0.00";
          const totalRatings = ratings[0]?.totalRatings || 0;
          const response = {
            ...course.toJSON(), // Convert Sequelize instance to plain object
            averageRating: parseFloat(averageRating).toFixed(2),
            totalRatings,
        };
        res.status(200).json(response);
            // res.status(200).json({course,averageRating,totalRatings});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 22222

    // async getCourseWithContents(req, res) {
    //     const courseId = req.params.id; // Assuming the course ID is passed as a route parameter

    //     try {
    //       // Fetch the course with its related data
    //       const course = await Course.findOne({
    //         where: { id: courseId },
    //         include: [
    //           {
    //             model: CourseContent,
    //             as: 'CourseContents', // Alias for the relation
    //             attributes: [
    //               'id',
    //               'content_type',
    //               'title',
    //               'description',
    //               'file_url',
    //               'content_order',
    //               'duration'
    //             ],
    //             order: [['content_order', 'ASC']] // Order by content order
    //           },
    //           {
    //             model: CourseImage,
    //             required: true, // Use LEFT JOIN (optional)
    //             attributes: ['image']
    //           },
    //           {
    //             model: CourseRating,
    //             required:false,
    //             attributes: [] // Avoid fetching individual ratings
    //           }
    //         ]
    //       });

    //       if (!course) {
    //         return res.status(404).json({ message: 'Course not found' });
    //       }

    //       // Calculate average rating
    //       const ratings = await CourseRating.findAll({
    //         where: { course_id: courseId },
    //         attributes: [
    //           [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
    //           [Sequelize.fn('COUNT', Sequelize.col('rating')), 'totalRatings']
    //         ],
    //         raw: true // Return plain object
    //       });

    //       const averageRating = ratings[0]?.averageRating || "0.00";
    //       const totalRatings = ratings[0]?.totalRatings || 0;

    //       // Shape the final response
    //       const response = {
    //         // id: course.id,
    //         // // name: course.name,
    //         // description: course.description,
    //         // price: course.price,
    //         // duration: course.duration,
    //         averageRating: parseFloat(averageRating).toFixed(2),
    //         totalRatings,
    //         contents: course.CourseContents,
    //         images: course.CourseImages
    //       };

    //       res.status(200).json(response);
    //     } catch (error) {
    //       res.status(500).json({ error: error.message });
    //     }
    //   },



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
