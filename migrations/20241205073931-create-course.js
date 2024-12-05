'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      instructor_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      thumbnail_url: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.ENUM('beginner', 'intermediate', 'advanced'),
      },
      price: {
        type: Sequelize.DECIMAL
      },
      discount: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.ENUM('draft', 'published', 'archiv	ed'),
        defaultValue: 'draft',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};