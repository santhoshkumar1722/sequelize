'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payment.belongsTo(models.course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
      });
      payment.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }
  payment.init({
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
    amount: DataTypes.DECIMAL,
    payment_status: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    transaction_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};