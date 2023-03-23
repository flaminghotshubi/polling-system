const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questions_controller');
const optionController = require('../controllers/options_controller');

//api to create an option
router.post('/:id/options/create', optionController.create);

//api to get list of all questions (only id and title)
router.get('/', questionController.allQuestions);

//api to get all details of a question
router.get('/:id', questionController.questionById);

//api to create a question
router.post('/create', questionController.create);

//api to delete a question
router.delete('/:id/delete', questionController.delete);

module.exports = router