'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      quiz.belongsTo(models.course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
    });
    }
  }
  quiz.init({
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses', // Ensure it matches the Courses model name
        key: 'course_id',
      },
      onDelete: 'CASCADE',
    },
    title: DataTypes.STRING,
    total_marks: DataTypes.INTEGER,
    passing_marks: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'quiz',
  });
  return quiz;
};