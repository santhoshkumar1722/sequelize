const db = require("../models");
const Payment = db.payment;

const paymentController = {
  // Create a payment
  async createPayment(req, res) {
    const { user_id, course_id, amount, payment_status, payment_method, transaction_id } = req.body;

    try {
      const payment = await Payment.create({
        user_id,
        course_id,
        amount,
        payment_status,
        payment_method,
        transaction_id,
      });
      res.status(201).json(payment);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all payments
  async getAllPayments(req, res) {
    try {
      const payments = await Payment.findAll();
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get a payment by ID
  async getPaymentById(req, res) {
    const { payment_id } = req.params;

    try {
      const payment = await Payment.findByPk(payment_id);
      if (!payment) return res.status(404).send("Payment not found!");
      res.status(200).json(payment);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Update a payment
  async updatePayment(req, res) {
    const { payment_id } = req.params;
    const { payment_status, payment_method, transaction_id } = req.body;

    try {
      const payment = await Payment.findByPk(payment_id);
      if (!payment) return res.status(404).send("Payment not found!");

      await payment.update({ payment_status, payment_method, transaction_id });
      res.status(200).json({ message: "Payment updated successfully!", payment });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete a payment
  async deletePayment(req, res) {
    const { payment_id } = req.params;

    try {
      const payment = await Payment.findByPk(payment_id);
      if (!payment) return res.status(404).send("Payment not found!");

      await payment.destroy();
      res.status(200).send("Payment deleted successfully!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = paymentController;
