const challenge = require('./challengeRouter');

const express = require('express');
var router = express.Router();
router.use('/challenges',challenge);

module.exports = router;