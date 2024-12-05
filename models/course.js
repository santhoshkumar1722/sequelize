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
        foreignKey: 'user_id',
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
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    thumbnail_url: DataTypes.STRING,
    category: DataTypes.STRING,
    level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    },
    price: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archiv	ed'),
      defaultValue: 'draft',
    },
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};