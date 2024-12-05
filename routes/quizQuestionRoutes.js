const express = require("express");
const quizQuestionController = require("../controllers/quizQuestionController");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/quiz-questions", authMiddleware,quizQuestionController.createQuestion);
router.get("/quiz-questions/quiz/:quiz_id", authMiddleware,quizQuestionController.getQuestionsByQuiz);
router.get("/quiz-questions/:question_id", authMiddleware,quizQuestionController.getQuestionById);
router.put("/quiz-questions/:question_id", authMiddleware,quizQuestionController.updateQuestion);
router.delete("/quiz-questions/:question_id", authMiddleware,quizQuestionController.deleteQuestion);

module.exports = router;
