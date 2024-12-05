'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notification.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
    });
    }
  }
  notification.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
      onDelete: 'CASCADE',
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    read_status: DataTypes.BOOLEAN,
    date_sent: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};