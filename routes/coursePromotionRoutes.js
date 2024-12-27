const express = require('express');
const coursePromotionController = require('../controllers/coursePromotionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/promotions', authMiddleware,coursePromotionController.createPromotion);
router.get('/promotions', authMiddleware,coursePromotionController.getPromotions);
router.get('/promotions/:id', authMiddleware,coursePromotionController.getPromotionById);
router.put('/promotions/:id', authMiddleware,coursePromotionController.updatePromotion);
router.delete('/promotions/:id', authMiddleware,coursePromotionController.deletePromotion);

module.exports = router;