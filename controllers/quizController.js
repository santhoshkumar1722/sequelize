const db = require("../models");
const Quiz = db.quiz;

const quizController = {
  // Create a new quiz
  async createQuiz(req, res) {
    const { course_id, title, total_marks, passing_marks } = req.body;

    try {
      const newQuiz = await Quiz.create({ course_id, title, total_marks, passing_marks });
      res.status(201).json(newQuiz);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all quizzes for a course
  async getQuizzesByCourse(req, res) {
    const { course_id } = req.params;

    try {
      const quizzes = await Quiz.findAll({ where: { course_id } });
      res.status(200).json(quizzes);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get a specific quiz by ID
  async getQuizById(req, res) {
    const { quiz_id } = req.params;

    try {
      const quiz = await Quiz.findByPk(quiz_id);
      if (!quiz) return res.status(404).send("Quiz not found!");
      res.status(200).json(quiz);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Update a quiz
  async updateQuiz(req, res) {
    const { quiz_id } = req.params;
    const { title, total_marks, passing_marks } = req.body;

    try {
      const quiz = await Quiz.findByPk(quiz_id);
      if (!quiz) return res.status(404).send("Quiz not found!");

      await quiz.update({ title, total_marks, passing_marks });
      res.status(200).json({ message: "Quiz updated successfully!", quiz });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete a quiz
  async deleteQuiz(req, res) {
    const { quiz_id } = req.params;

    try {
      const quiz = await Quiz.findByPk(quiz_id);
      if (!quiz) return res.status(404).send("Quiz not found!");

      await quiz.destroy();
      res.status(200).send("Quiz deleted successfully!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  
};

module.exports = quizController;
