'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course_content.belongsTo(models.course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
      });
    }
  }
  course_content.init({
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    content_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["video", "quiz", "pdf", "assignment"]],
      },
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    file_url: DataTypes.STRING,
    content_order: DataTypes.INTEGER,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'course_content',
  });
  return course_content;
};