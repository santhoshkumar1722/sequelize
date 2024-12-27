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
const favoriteCourseRoutes = require("./routes/favoriteCourseRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200' // Allow requests from Angular frontend
  }));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api",coursePromotionRoutes); 
app.use("/admin",courseRoutes);
app.use("/api",courseCategoryRoutes);
app.use("/api",couponRoutes);
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
app.use("/api", favoriteCourseRoutes);

module.exports = app;