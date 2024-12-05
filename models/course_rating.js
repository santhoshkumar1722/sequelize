'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course_rating.belongsTo(models.course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
      });
      course_rating.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }
  course_rating.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "courses",
        key: "course_id",
      },
      onDelete: "CASCADE",
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'course_rating',
  });
  return course_rating;
};