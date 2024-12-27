const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/user/:id',authMiddleware, authController.getProfile);
router.get('/users/:id',authMiddleware, authController.getUserProfile);
router.put('/user/:id',authMiddleware, authController.updateProfile);
router.delete('/user/:id',authMiddleware, authController.deleteUser);

module.exports = router;