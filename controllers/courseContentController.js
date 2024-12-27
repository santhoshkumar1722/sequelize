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

  async getContentByCourseId(req, res) {
    const { course_id } = req.params;

    try {
        // Fetch all content for the given course_id
        const contents = await CourseContent.findAll({
            where: { course_id }, // Filter by course_id
            order: [['content_order', 'ASC']], // Order by content_order
            attributes: ['id', 'content_type', 'title', 'description', 'file_url', 'content_order', 'duration'], // Select specific fields
        });

        if (contents.length === 0) {
            return res.status(404).json({ message: "No content found for this course!" });
        }

        res.status(200).json(contents);
    } catch (err) {
        console.error("Error fetching content:", err);
        res.status(500).json({ error: err.message });
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
