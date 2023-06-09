const express = require('express');
const router = express.Router();

//configure api paths
router.use('/questions', require('./questions'));
router.use('/options', require('./options'));

module.exports = router