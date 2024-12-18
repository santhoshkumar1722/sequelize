const db = require("../models");
const CourseImage = db.course_image;

const courseImageController = {
  // Create an image
  async createImage(req, res) {
    const { course_id, description } = req.body;
    const { buffer } = req.file; // `buffer` contains the binary image data

    try {
      const image = await CourseImage.create({
        course_id,
        image: buffer,
        description,
      });
      res.status(201).json(image);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get all images
  async getAllImages(req, res) {
    try {
      const images = await CourseImage.findAll();
      res.status(200).json(images);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Get an image by ID
  async getImageById(req, res) {
    const { image_id } = req.params;

    try {
      const image = await CourseImage.findByPk(image_id);
      if (!image) return res.status(404).send("Image not found!");
      res.status(200).json(image);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Update image description
  async updateImage(req, res) {
    const { image_id } = req.params;
    const { description,image } = req.body;


    try {
      const images = await CourseImage.findByPk(image_id);
      if (!images) return res.status(404).send("Image not found!");
      await images.update({ description,image });
      res.status(200).json({ message: "Image updated successfully!", images });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Delete an image
  async deleteImage(req, res) {
    const { image_id } = req.params;

    try {
      const image = await CourseImage.findByPk(image_id);
      if (!image) return res.status(404).send("Image not found!");

      await image.destroy();
      res.status(200).send("Image deleted successfully!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  
};

module.exports = courseImageController;
