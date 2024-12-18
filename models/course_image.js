'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course_image.belongsTo(models.course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
      });
    }
  }
  course_image.init({
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    image: DataTypes.BLOB,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'course_image',
  });
  return course_image;
};