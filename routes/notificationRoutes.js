const express = require("express");
const authMiddleware = require('../middleware/authMiddleware');
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.post("/notifications", authMiddleware,notificationController.createNotification);
router.get("/notifications/user/:user_id", authMiddleware,notificationController.getNotifications);
router.put("/notifications/:notification_id/read", authMiddleware,notificationController.markAsRead);
router.delete("/notifications/:notification_id", authMiddleware,notificationController.deleteNotification);

module.exports = router;