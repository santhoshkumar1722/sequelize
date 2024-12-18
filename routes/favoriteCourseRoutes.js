const express = require("express");
const favoriteCourseController = require("../controllers/favoriteCourseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/favorites", authMiddleware, favoriteCourseController.addFavorite);
router.get("/favorites/:user_id", authMiddleware, favoriteCourseController.getFavoritesByUser);
router.delete("/favorites/:id", authMiddleware, favoriteCourseController.deleteFavorite);

module.exports = router;
