const router = require("express").Router();
const quizController = require("../controllers/quizController");
const Quiz = require("../models/quizModel");

router.route("/create").post(quizController.createQuiz);
router.route("/list").get(quizController.getQuizzes);
router
  .route("/:quizId")
  .get(quizController.getQuizById)
  .put(quizController.updateQuiz)
  .delete(quizController.deleteQuiz);

module.exports = router;
