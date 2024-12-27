const express = require("express");
const quizAnswerController = require("../controllers/quizAnswerController");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/quiz-answers", authMiddleware,quizAnswerController.createAnswer);
router.get("/quiz-answers/question/:question_id", authMiddleware,quizAnswerController.getAnswersByQuestion);
router.get("/quiz-answers/:answer_id", authMiddleware,quizAnswerController.getAnswerById);
router.put("/quiz-answers/:answer_id", authMiddleware,quizAnswerController.updateAnswer);
router.delete("/quiz-answers/:answer_id", authMiddleware,quizAnswerController.deleteAnswer);

module.exports = router;