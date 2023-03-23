const express = require('express');
const router = express.Router();
const optionController = require('../controllers/options_controller');

//api to delete an option
router.delete('/:id/delete', optionController.delete);

//api to vote for an option
router.get('/:id/add_vote', optionController.addVote);

module.exports = router