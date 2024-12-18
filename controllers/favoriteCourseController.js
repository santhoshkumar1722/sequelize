const db = require("../models");
const FavoriteCourse = db.favorite_course;

const favoriteCourseController = {
  // Add a course to the user's favorites
  async addFavorite(req, res) {
    const { user_id, course_id } = req.body;

    try {
      // Check if the favorite already exists
      const existingFavorite = await FavoriteCourse.findOne({
        where: { user_id, course_id },
      });
      if (existingFavorite) {
        return res.status(400).json({ message: "Course already favorited!" });
      }

      const favorite = await FavoriteCourse.create({ user_id, course_id });
      res.status(201).json(favorite);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all favorite courses for a user
  async getFavoritesByUser(req, res) {
    const { user_id } = req.params;

    try {
      const favorites = await FavoriteCourse.findAll({
        where: { user_id },
      });
      res.status(200).json(favorites);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete a favorite course
  async deleteFavorite(req, res) {
    const { id } = req.params; // Assuming `id` is the primary key for the favorite_course table

    try {
      const favorite = await FavoriteCourse.findByPk(id);
      if (!favorite) {
        return res.status(404).json({ message: "Favorite course not found!" });
      }

      await favorite.destroy();
      res.status(200).json({ message: "Favorite course removed successfully!" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = favoriteCourseController;
