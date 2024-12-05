'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quiz_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      quiz_answer.belongsTo(models.quiz_question, {
        foreignKey: 'question_id',
        onDelete: 'CASCADE',
    });
    }
  }
  quiz_answer.init({
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "quiz_question", // Ensure this matches your QuizQuestion model name
        key: "question_id",
      },
      onDelete: "CASCADE",
    },
    answer_text: DataTypes.TEXT,
    is_correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'quiz_answer',
  });
  return quiz_answer;
};