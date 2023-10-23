const Quiz = require('../models/quizModel'); // Import the Quiz model

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const quizData = req.body;
    const newQuiz = await Quiz.create(quizData);
    res.json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the quiz.' });
  }
};

// Get a list of all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes.' });
  }
};

// Get a specific quiz by its ID
exports.getQuizById = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found.' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the quiz.' });
  }
};

// Update a quiz by its ID
exports.updateQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ error: 'Quiz not found.' });
    }
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the quiz.' });
  }
};

// Delete a quiz by its ID
exports.deleteQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    const deletedQuiz = await Quiz.findByIdAndRemove(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ error: 'Quiz not found.' });
    }
    res.json(deletedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the quiz.' });
  }
};
