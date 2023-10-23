const Result = require('../models/quizResultModel');

// Get all results for a specific quiz by quiz ID
exports.getResultsForQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    const results = await Result.find({ quizId });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results for the quiz.' });
  }
};

// Get all results for a specific user by user ID
exports.getResultsForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const results = await Result.find({ userId });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results for the user.' });
  }
};

// Get a specific result by result ID
exports.getResultById = async (req, res) => {
  const { resultId } = req.params;
  try {
    const result = await Result.findById(resultId);
    if (!result) {
      return res.status(404).json({ error: 'Result not found.' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the result.' });
  }
};
