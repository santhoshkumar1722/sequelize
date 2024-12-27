const express = require("express");
const quizController = require("../controllers/quizController");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/quizzes", authMiddleware,quizController.createQuiz);
router.get("/quizzes/course/:course_id", authMiddleware,quizController.getQuizzesByCourse);
router.get("/quizzes/:quiz_id", authMiddleware,quizController.getQuizById);
router.put("/quizzes/:quiz_id", authMiddleware,quizController.updateQuiz);
router.delete("/quizzes/:quiz_id", authMiddleware,quizController.deleteQuiz);

module.exports = router;