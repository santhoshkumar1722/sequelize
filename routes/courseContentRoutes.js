const express = require("express");
const courseContentController = require("../controllers/courseContentController");
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post("/course-content", authMiddleware,courseContentController.createContent);
router.get("/course-content", authMiddleware,courseContentController.getAllContent);
router.get("/course-content/:content_id", authMiddleware,courseContentController.getContentById);
router.put("/course-content/:content_id", authMiddleware,courseContentController.updateContent);
router.delete("/course-content/:content_id", authMiddleware,courseContentController.deleteContent);

module.exports = router;
