'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quiz_question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      quiz_question.belongsTo(models.quiz, {
        foreignKey: 'quiz_id',
        onDelete: 'CASCADE',
    });
    }
  }
  quiz_question.init({
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quiz',
        key: 'quiz_id',
      },
      onDelete: "CASCADE",
    },
    question_text: DataTypes.TEXT,
    question_type: DataTypes.STRING,
    correct_answer: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'quiz_question',
  });
  return quiz_question;
};