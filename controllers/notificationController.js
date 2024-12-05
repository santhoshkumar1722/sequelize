const db = require("../models");
const Notification = db.notification;

const notificationController = {
  // Create a new notification
  async createNotification(req, res) {
    const { user_id, title, content } = req.body;

    try {
      const notification = await Notification.create({
        user_id,
        title,
        content,
      });
      res.status(201).json(notification);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all notifications for a user
  async getNotifications(req, res) {
    const { user_id } = req.params;

    try {
      const notifications = await Notification.findAll({ where: { user_id } });
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Mark a notification as read
  async markAsRead(req, res) {
    const { notification_id } = req.params;

    try {
      const notification = await Notification.findByPk(notification_id);
      if (!notification) return res.status(404).send("Notification not found!");

      await notification.update({ read_status: true });
      res.status(200).json({ message: "Notification marked as read!", notification });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete a notification
  async deleteNotification(req, res) {
    const { notification_id } = req.params;

    try {
      const notification = await Notification.findByPk(notification_id);
      if (!notification) return res.status(404).send("Notification not found!");

      await notification.destroy();
      res.status(200).send("Notification deleted successfully!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = notificationController;
