const mongoose = require('mongoose');

const qnaOptionSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
});

const pollOptionSchema = new mongoose.Schema({
  text: String,
  imageUrl: String,
  votes: Number,
});

const qnaQuestionSchema = new mongoose.Schema({
  text: String,
  options: [qnaOptionSchema],
});

const pollQuestionSchema = new mongoose.Schema({
  text: String,
  options: [pollOptionSchema],
});

const resultSchema = new mongoose.Schema({
  userId: String,
  score: Number,
  date: Date,
});

const quizSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['qna', 'poll'],
  },
  title: String,
  description: String,
  questions: [mongoose.Schema.Types.Mixed], 
  results: [resultSchema],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
