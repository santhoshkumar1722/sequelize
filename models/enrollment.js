'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      enrollment.belongsTo(models.course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
      });
      enrollment.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }
  enrollment.init({
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
    completion_status: DataTypes.STRING,
    progress: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'enrollment',
    timestamps: true,
  });
  return enrollment;
};