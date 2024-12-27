const db = require("../models");
const Enrollment = db.enrollment;
const Course = db.course;

const enrollmentController = {
  async createEnrollment(req, res) {
    const { user_id, course_id, completion_status, progress } = req.body;

    try {
      // Check if the enrollment already exists for the user and course
      const existingEnrollment = await Enrollment.findOne({
        where: { user_id, course_id },
      });

      if (existingEnrollment) {
        // If enrollment exists, send a response indicating it already exists
        return res.status(409).json({
          message: 'Enrollment already exists for this user and course.',
        });
      }

      // If no existing enrollment, create a new one
      const enrollment = await Enrollment.create({
        user_id,
        course_id,
        completion_status,
        progress,
      });

      res.status(201).json(enrollment);
    } catch (err) {
      // Handle any errors during the process
      res.status(500).send(err.message);
    }
  },


  // Get all enrollments
  async getAllEnrollments(req, res) {
    try {
      const enrollments = await Enrollment.findAll();
      res.status(200).json(enrollments);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all enrollments by user_id
  async getEnrollmentByUserId(req, res) {
    const { user_id } = req.params;

    try {
      // Fetch all enrollments for the given user_id, including associated course details
      const enrollments = await Enrollment.findAll({
        where: { user_id, progress: 0, }
      });

      // If no enrollments found for the user
      if (!enrollments || enrollments.length === 0) {
        return res.status(404).send("No enrollments found for this user!");
      }

      // Return the enrollments
      res.status(200).json(enrollments);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get an enrollment by ID
  async getEnrollmentById(req, res) {
    const { enrollment_id } = req.params;

    try {
      const enrollment = await Enrollment.findByPk(enrollment_id);
      if (!enrollment) return res.status(404).send("Enrollment not found!");
      res.status(200).json(enrollment);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete an enrollment
  async deleteEnrollment(req, res) {
    const { enrollment_id } = req.params;

    try {
      const enrollment = await Enrollment.findByPk(enrollment_id);
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment course not found!" });
      }

      await enrollment.destroy();
      res.status(200).send({ message: "Enrollment course removed successfully!" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  async getEnrollmentByUserIdAndUpdateProgress(req, res) {
    const { user_id } = req.params;

    try {
      // Fetch all enrollments for the given user_id, including associated course details
      const enrollments = await Enrollment.findAll({
        where: { user_id, progress: 1, }
      });

      // If no enrollments found for the user
      if (!enrollments || enrollments.length === 0) {
        return res.status(404).send("No enrollments found for this user!");
      }

      // Return the enrollments
      res.status(200).json(enrollments);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  async updateBulkEnrollment(req, res) {
    const updates = req.body.updates;
    console.log(req.body);


    // Validate input
    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ message: 'Invalid payload. Updates should be a non-empty array.' });
    }

    const failedUpdates = [];
    const successUpdates = [];

    try {
      // Process updates concurrently
      await Promise.all(
        updates.map(async (update) => {
          const { user_id, course_id, completion_status, progress } = update;

          if (!user_id || !course_id || completion_status === undefined || progress === undefined) {
            failedUpdates.push({ update, error: 'Missing required fields' });
            return;
          }

          try {
            // Perform the update
            const [affectedRows, updatedRows] = await Enrollment.update(
              { completion_status, progress },
              {
                where: { user_id, course_id },
                returning: true,
              }
            );

            if (affectedRows === 0) {
              failedUpdates.push({ update, error: 'No matching record found' });
            } else {
              successUpdates.push(...updatedRows);
            }
          } catch (err) {
            failedUpdates.push({ update, error: err.message });
          }
        })
      );

      if (failedUpdates.length > 0) {
        return res.status(207).json({
          message: 'Some updates failed!',
          failedUpdates,
          successUpdates,
        });
      }

      res.status(200).json({
        message: 'All enrollments updated successfully!',
        successUpdates,
      });
    } catch (err) {
      console.error('Error updating enrollments:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }



};

module.exports = enrollmentController;