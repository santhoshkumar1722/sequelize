const db = require("../models");
const Enrollment = db.enrollment;

const enrollmentController = {
  // Create an enrollment
  async createEnrollment(req, res) {
    const { user_id, course_id, completion_status, progress } = req.body;

    try {
      const enrollment = await Enrollment.create({
        user_id,
        course_id,
        completion_status,
        progress,
      });
      res.status(201).json(enrollment);
    } catch (err) {
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

  // Update an enrollment
  async updateEnrollment(req, res) {
    const { enrollment_id } = req.params;
    const { completion_status, progress } = req.body;

    try {
      const enrollment = await Enrollment.findByPk(enrollment_id);
      if (!enrollment) return res.status(404).send("Enrollment not found!");

      await enrollment.update({ completion_status, progress });
      res.status(200).json({ message: "Enrollment updated successfully!", enrollment });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete an enrollment
  async deleteEnrollment(req, res) {
    const { enrollment_id } = req.params;

    try {
      const enrollment = await Enrollment.findByPk(enrollment_id);
      if (!enrollment) return res.status(404).send("Enrollment not found!");

      await enrollment.destroy();
      res.status(200).send("Enrollment deleted successfully!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = enrollmentController;
