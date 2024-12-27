const express = require("express");
const forumPostController = require("../controllers/forumPostController");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/forum-posts", authMiddleware,forumPostController.createPost);
router.get("/forum-posts/course/:course_id", authMiddleware,forumPostController.getPostsByCourse);
router.get("/forum-posts/:post_id", authMiddleware,forumPostController.getPostById);
router.put("/forum-posts/:post_id", authMiddleware,forumPostController.updatePost);
router.delete("/forum-posts/:post_id", authMiddleware,forumPostController.deletePost);

module.exports = router;