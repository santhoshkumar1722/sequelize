const db = require("../models");
const QuizAnswer = db.quiz_answer;

const quizAnswerController = {
  // Create a new answer
  async createAnswer(req, res) {
    const { question_id, answer_text, is_correct } = req.body;

    try {
      const newAnswer = await QuizAnswer.create({ question_id, answer_text, is_correct });
      res.status(201).json(newAnswer);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all answers for a question
  async getAnswersByQuestion(req, res) {
    const { question_id } = req.params;

    try {
      const answers = await QuizAnswer.findAll({ where: { question_id } });
      res.status(200).json(answers);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get a specific answer by ID
  async getAnswerById(req, res) {
    const { answer_id } = req.params;

    try {
      const answer = await QuizAnswer.findByPk(answer_id);
      if (!answer) return res.status(404).send("Answer not found!");
      res.status(200).json(answer);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Update an answer
  async updateAnswer(req, res) {
    const { answer_id } = req.params;
    const { answer_text, is_correct } = req.body;

    try {
      const answer = await QuizAnswer.findByPk(answer_id);
      if (!answer) return res.status(404).send("Answer not found!");

      await answer.update({ answer_text, is_correct });
      res.status(200).json({ message: "Answer updated successfully!", answer });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete an answer
  async deleteAnswer(req, res) {
    const { answer_id } = req.params;

    try {
      const answer = await QuizAnswer.findByPk(answer_id);
      if (!answer) return res.status(404).send("Answer not found!");

      await answer.destroy();
      res.status(200).send("Answer deleted successfully!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = quizAnswerController;
