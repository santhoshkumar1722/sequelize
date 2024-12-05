const db = require("../models");
const CourseContent = db.course_content;

const courseContentController = {
  // Create content
  async createContent(req, res) {
    const { course_id, content_type, title, description, file_url, content_order, duration } = req.body;

    try {
      const content = await CourseContent.create({
        course_id,
        content_type,
        title,
        description,
        file_url,
        content_order,
        duration,
      });
      res.status(201).json(content);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all content
  async getAllContent(req, res) {
    try {
      const content = await CourseContent.findAll();
      res.status(200).json(content);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get content by ID
  async getContentById(req, res) {
    const { content_id } = req.params;

    try {
      const content = await CourseContent.findByPk(content_id);
      if (!content) return res.status(404).send("Content not found!");
      res.status(200).json(content);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Update content
  async updateContent(req, res) {
    const { content_id } = req.params;
    const { content_type, title, description, file_url, content_order, duration } = req.body;

    try {
      const content = await CourseContent.findByPk(content_id);
      if (!content) return res.status(404).send("Content not found!");

      await content.update({ content_type, title, description, file_url, content_order, duration });
      res.status(200).json({ message: "Content updated successfully!", content });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete content
  async deleteContent(req, res) {
    const { content_id } = req.params;

    try {
      const content = await CourseContent.findByPk(content_id);
      if (!content) return res.status(404).send("Content not found!");

      await content.destroy();
      res.status(200).send("Content deleted successfully!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = courseContentController;
