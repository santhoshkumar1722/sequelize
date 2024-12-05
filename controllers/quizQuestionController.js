const db = require("../models");
const QuizQuestion = db.quiz_question;

const quizQuestionController = {
  // Create a new quiz question
  async createQuestion(req, res) {
    const { quiz_id, question_text, question_type, correct_answer } = req.body;

    try {
      const newQuestion = await QuizQuestion.create({
        quiz_id,
        question_text,
        question_type,
        correct_answer,
      });
      res.status(201).json(newQuestion);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all questions for a quiz
  async getQuestionsByQuiz(req, res) {
    const { quiz_id } = req.params;

    try {
      const questions = await QuizQuestion.findAll({ where: { quiz_id } });
      res.status(200).json(questions);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get a specific question by ID
  async getQuestionById(req, res) {
    const { question_id } = req.params;

    try {
      const question = await QuizQuestion.findByPk(question_id);
      if (!question) return res.status(404).send("Question not found!");
      res.status(200).json(question);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Update a quiz question
  async updateQuestion(req, res) {
    const { question_id } = req.params;
    const { question_text, question_type, correct_answer } = req.body;

    try {
      const question = await QuizQuestion.findByPk(question_id);
      if (!question) return res.status(404).send("Question not found!");

      await question.update({ question_text, question_type, correct_answer });
      res.status(200).json({ message: "Question updated successfully!", question });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete a quiz question
  async deleteQuestion(req, res) {
    const { question_id } = req.params;

    try {
      const question = await QuizQuestion.findByPk(question_id);
      if (!question) return res.status(404).send("Question not found!");

      await question.destroy();
      res.status(200).send("Question deleted successfully!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = quizQuestionController;
