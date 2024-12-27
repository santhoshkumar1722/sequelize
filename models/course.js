'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course.belongsTo(models.user, {
        foreignKey: 'instructor_id',
        onDelete: 'CASCADE',
      });
      course.hasOne(models.course_image, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
      });
      course.hasMany(models.course_content, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
        as: 'CourseContents', // Alias for the relation
      });
      course.hasOne(models.course_rating, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
      });

    }
  }
  course.init({
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    thumbnail_url: DataTypes.STRING,
    category: DataTypes.STRING,
    level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      defaultValue: 'beginner',

    },
    price: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archiv	ed'),
      defaultValue: 'draft',
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}, // Default value can be an empty object
    },
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};