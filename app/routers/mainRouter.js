const express = require('express');

const {authCheck} = require('../middlewares/authCheck')
const challenge = require('./challengeRouter');
const course = require('./courseRouter');
const lesson = require('./lessonRouter');
const user = require('./userRouter');
const topicRouter = require('./topicRouter');

var router = express.Router();
router.use('/challenges', authCheck, challenge);
router.use('/courses', authCheck, course);
router.use('/lessons', authCheck, lesson);
router.use('/users', authCheck, user);
router.use('/topics', authCheck, topicRouter);

module.exports = router;