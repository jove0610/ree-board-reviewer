const express = require('express');

const auth = require('../middleware/auth');

const User = require('../models/user');

const router = express.Router();

// Create a quiz
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.quiz.unshift(req.body.quiz);

    await user.save();
    res.json(user.quiz);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update a quiz
router.put('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { _id, questionnaire, optionA, optionB, optionC, optionD, answer } =
      req.body.quiz;
    const oldQuiz = user.quiz.findIndex((quiz) => quiz.id === _id);

    const newQuiz = {
      _id,
      questionnaire,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
    };

    user.quiz.splice(oldQuiz, 1, newQuiz);

    await user.save();
    res.json(user.quiz);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a quiz
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const deleteItemIndex = user.quiz.findIndex(
      (quiz) => quiz.id === req.body.quizID
    );

    user.quiz.splice(deleteItemIndex, 1);

    await user.save();

    res.json(user.quiz);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
