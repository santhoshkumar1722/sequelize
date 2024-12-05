const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const courseCategoryRoutes = require("./routes/courseCategoryRoutes");
const couponRoutes = require('./routes/couponRoutes');
const coursePromotionRoutes = require('./routes/coursePromotionRoutes');
const notificationRoutes = require("./routes/notificationRoutes");
const quizRoutes = require("./routes/quizRoutes");
const forumPostRoutes = require("./routes/forumPostRoutes");
const quizQuestionRoutes = require("./routes/quizQuestionRoutes");
const quizAnswerRoutes = require("./routes/quizAnswerRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const courseRatingRoutes = require("./routes/courseRatingRoutes");
const courseContentRoutes = require("./routes/courseContentRoutes");
const courseImageRoutes = require("./routes/courseImageRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api",coursePromotionRoutes); 
app.use(courseRoutes);
app.use(courseCategoryRoutes);
app.use(couponRoutes);
app.use("/api", notificationRoutes);
app.use("/api", forumPostRoutes);
app.use("/api", quizRoutes);
app.use("/api", quizQuestionRoutes);
app.use("/api", quizAnswerRoutes);
app.use("/api", paymentRoutes);
app.use("/api", enrollmentRoutes);
app.use("/api", courseRatingRoutes);
app.use("/api", courseContentRoutes);
app.use("/api", courseImageRoutes);

module.exports = app;