const db = require("../models");
const CourseRating = db.course_rating;

const courseRatingController = {
  // Create a new course rating
  async createRating(req, res) {
    const { course_id, user_id, rating, review } = req.body;

    try {
      const courseRating = await CourseRating.create({
        course_id,
        user_id,
        rating,
        review,
      });
      res.status(201).json(courseRating);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all ratings
  async getAllRatings(req, res) {
    try {
      const ratings = await CourseRating.findAll();
      res.status(200).json(ratings);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get a rating by ID
  async getRatingById(req, res) {
    const { rating_id } = req.params;

    try {
      const courseRating = await CourseRating.findByPk(rating_id);
      if (!courseRating) return res.status(404).send("Rating not found!");
      res.status(200).json(courseRating);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Update a rating
  async updateRating(req, res) {
    const { rating_id } = req.params;
    const { rating, review } = req.body;

    try {
      const courseRating = await CourseRating.findByPk(rating_id);
      if (!courseRating) return res.status(404).send("Rating not found!");

      await courseRating.update({ rating, review });
      res.status(200).json({ message: "Rating updated successfully!", courseRating });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete a rating
  async deleteRating(req, res) {
    const { rating_id } = req.params;

    try {
      const courseRating = await CourseRating.findByPk(rating_id);
      if (!courseRating) return res.status(404).send("Rating not found!");

      await courseRating.destroy();
      res.status(200).send("Rating deleted successfully!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  
};

module.exports = courseRatingController;
