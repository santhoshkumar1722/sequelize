const express = require("express");
const authMiddleware = require('../middleware/authMiddleware');
const enrollmentController = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/enrollments", authMiddleware,enrollmentController.createEnrollment);
router.get("/enrollments", authMiddleware,enrollmentController.getAllEnrollments);
router.get("/enrollments/:enrollment_id", authMiddleware,enrollmentController.getEnrollmentById);
router.put("/enrollments/:enrollment_id", authMiddleware,enrollmentController.updateEnrollment);
router.delete("/enrollments/:enrollment_id", authMiddleware,enrollmentController.deleteEnrollment);

module.exports = router;
