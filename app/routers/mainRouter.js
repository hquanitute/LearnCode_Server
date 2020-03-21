const challenge = require('./challengeRouter');
const course = require('./courseRouter');
const lesson = require('./lessonRouter');

const express = require('express');
var router = express.Router();
router.use('/challenges',challenge);
router.use('/courses',course);
router.use('/lessons',lesson);

module.exports = router;