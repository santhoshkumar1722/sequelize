'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course_promotion.belongsTo(models.course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
    });
    }
  }
  course_promotion.init({
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Courses',
          key: 'course_id',
      },
      onDelete: 'CASCADE',
  },    discount: DataTypes.DECIMAL,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'course_promotion',
  });
  return course_promotion;
};