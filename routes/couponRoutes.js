const express = require('express');
const couponController = require('../controllers/couponController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/coupons', authMiddleware,couponController.createCoupon);
router.get('/coupons', authMiddleware,couponController.getCoupons);
router.get('/coupons/:id', authMiddleware,couponController.getCouponById);
router.put('/coupons/:id', authMiddleware,couponController.updateCoupon);
router.delete('/coupons/:id', authMiddleware,couponController.deleteCoupon);

module.exports = router;
