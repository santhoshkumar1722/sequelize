const express = require("express");
const courseRatingController = require("../controllers/courseRatingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/course-ratings", authMiddleware,courseRatingController.createRating);
router.get("/course-ratings", authMiddleware,courseRatingController.getAllRatings);
router.get("/course-ratings/:rating_id", authMiddleware,courseRatingController.getRatingById);
router.put("/course-ratings/:rating_id", authMiddleware,courseRatingController.updateRating);
router.delete("/course-ratings/:rating_id", authMiddleware,courseRatingController.deleteRating);

module.exports = router;
