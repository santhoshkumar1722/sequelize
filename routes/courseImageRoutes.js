const express = require("express");
const multer = require("multer");
const courseImageController = require("../controllers/courseImageController");
const authMiddleware = require("../middleware/authMiddleware");


const upload = multer(); // Middleware for handling multipart/form-data

const router = express.Router();

router.post("/course-images",authMiddleware, upload.single("image"), courseImageController.createImage);
router.get("/course-images", authMiddleware,courseImageController.getAllImages);
router.get("/course-images/:image_id", authMiddleware,courseImageController.getImageById);
router.put("/course-images/:image_id", authMiddleware,courseImageController.updateImage);
router.delete("/course-images/:image_id", authMiddleware,courseImageController.deleteImage);

module.exports = router;
