'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class forum_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      forum_post.belongsTo(models.course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
    });
    forum_post.belongsTo(models.user, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
  });
    }
  }
  forum_post.init({
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'course_id',
      },
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
      onDelete: 'CASCADE',
    },
    post_content: DataTypes.TEXT,
    post_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'forum_post',
  });
  return forum_post;
};