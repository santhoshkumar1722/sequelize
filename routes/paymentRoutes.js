const express = require("express");
const paymentController = require("../controllers/paymentController");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/payments", authMiddleware,paymentController.createPayment);
router.get("/payments", authMiddleware,paymentController.getAllPayments);
router.get("/payments/:payment_id", authMiddleware,paymentController.getPaymentById);
router.put("/payments/:payment_id", authMiddleware,paymentController.updatePayment);
router.delete("/payments/:payment_id", authMiddleware,paymentController.deletePayment);

module.exports = router;