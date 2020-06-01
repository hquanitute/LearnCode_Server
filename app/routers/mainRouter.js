const express = require('express');

const {authCheck} = require('../middlewares/authCheck')
const challenge = require('./challengeRouter');
const course = require('./courseRouter');
const lesson = require('./lessonRouter');

var router = express.Router();
router.use('/challenges', authCheck, challenge);
router.use('/courses', authCheck, course);
router.use('/lessons', authCheck, lesson);

module.exports = router;