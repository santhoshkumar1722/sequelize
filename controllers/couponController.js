const db = require('../models');
const Coupon = db.coupon;

const couponController = {
    async createCoupon(req, res) {
        try {
            const newCoupon = await Coupon.create(req.body);
            res.status(201).json(newCoupon);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCoupons(req, res) {
        try {
            const coupons = await Coupon.findAll();
            res.status(200).json(coupons);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCouponById(req, res) {
        try {
            const coupon = await Coupon.findByPk(req.params.id);
            if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
            res.status(200).json(coupon);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateCoupon(req, res) {
        try {
            const coupon = await Coupon.findByPk(req.params.id);
            if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

            await coupon.update(req.body);
            res.status(200).json({ message: 'Coupon updated successfully', coupon });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteCoupon(req, res) {
        try {
            const coupon = await Coupon.findByPk(req.params.id);
            if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

            await coupon.destroy();
            res.status(200).json({ message: 'Coupon deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
};

module.exports = couponController;