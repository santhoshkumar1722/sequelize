const db = require('../models');
const CoursePromotion = db.course_promotion;

const coursePromotionController = {
    async createPromotion(req, res) {
        try {
            const newPromotion = await CoursePromotion.create(req.body);
            res.status(201).json(newPromotion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getPromotions(req, res) {
        try {
            const promotions = await CoursePromotion.findAll();
            res.status(200).json(promotions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getPromotionById(req, res) {
        try {
            const promotion = await CoursePromotion.findByPk(req.params.id);
            if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
            res.status(200).json(promotion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updatePromotion(req, res) {
        try {
            const promotion = await CoursePromotion.findByPk(req.params.id);
            if (!promotion) return res.status(404).json({ message: 'Promotion not found' });

            await promotion.update(req.body);
            res.status(200).json({ message: 'Promotion updated successfully', promotion });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deletePromotion(req, res) {
        try {
            const promotion = await CoursePromotion.findByPk(req.params.id);
            if (!promotion) return res.status(404).json({ message: 'Promotion not found' });

            await promotion.destroy();
            res.status(200).json({ message: 'Promotion deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
};

module.exports = coursePromotionController;