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
      const ratings = await CourseRating.findAll(


      );
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

  async getRatingByCourseId(req, res) {
    const { course_id } = req.params;

    try {
      const courseRatings = await CourseRating.findAll({
        where: { course_id },
        attributes: ['rating']});
        if (!courseRatings || courseRatings.length === 0) {
          return res.status(404).send("Course ID not found or no ratings available!");
        }
    
        // Calculate the average rating
        const totalRatings = courseRatings.length;
        const sumRatings = courseRatings.reduce((sum, item) => sum + item.rating, 0);
        const averageRating = (sumRatings / totalRatings).toFixed(2); // Round to 2 decimal places
    
        // Send the response with individual ratings and the average
        res.status(200).json({
          course_id,
          totalRatings,
          averageRating,
          ratings: courseRatings
        });
      // if (!courseRating) return res.status(404).send("Course id not found!");
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