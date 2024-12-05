const db = require("../models");
const ForumPost = db.forum_post;

const forumPostController = {
  // Create a new forum post
  async createPost(req, res) {
    const { course_id, user_id, post_content } = req.body;

    try {
      const newPost = await ForumPost.create({ course_id, user_id, post_content });
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all posts for a course
  async getPostsByCourse(req, res) {
    const { course_id } = req.params;

    try {
      const posts = await ForumPost.findAll({ where: { course_id } });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get a specific post
  async getPostById(req, res) {
    const { post_id } = req.params;

    try {
      const post = await ForumPost.findByPk(post_id);
      if (!post) return res.status(404).send("Post not found!");
      res.status(200).json(post);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Update a forum post
  async updatePost(req, res) {
    const { post_id } = req.params;
    const { post_content } = req.body;

    try {
      const post = await ForumPost.findByPk(post_id);
      if (!post) return res.status(404).send("Post not found!");

      await post.update({ post_content });
      res.status(200).json({ message: "Post updated successfully!", post });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete a forum post
  async deletePost(req, res) {
    const { post_id } = req.params;

    try {
      const post = await ForumPost.findByPk(post_id);
      if (!post) return res.status(404).send("Post not found!");

      await post.destroy();
      res.status(200).send("Post deleted successfully!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = forumPostController;
