const express = require("express");
const authMiddleware = require('../middleware/authMiddleware');
const enrollmentController = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/enrollments", authMiddleware,enrollmentController.createEnrollment);
router.get("/enrollments", authMiddleware,enrollmentController.getAllEnrollments);
router.get("/enrollments/user/:user_id", authMiddleware,enrollmentController.getEnrollmentByUserId);
router.get("/enrollment/user/:user_id", authMiddleware,enrollmentController.getEnrollmentByUserIdAndUpdateProgress);
// router.put("/enrollments/:enrollment_id", authMiddleware,enrollmentController.updateEnrollment);
router.put("/enrollments/bulk", authMiddleware,enrollmentController.updateBulkEnrollment);
router.delete("/enrollments/:enrollment_id", authMiddleware,enrollmentController.deleteEnrollment);

module.exports = router;
