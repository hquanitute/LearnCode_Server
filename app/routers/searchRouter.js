const express = require('express');
const Challenge = require('./../models/challenge');
const Topic = require('./../models/topic')
var router = express.Router();
const option = require('./../middlewares/queryOption')

router.get('/',option(), async (req,res) => {
    let regexp = new RegExp( req.query.key, 'i' );

    let promiseChallenge = await Challenge.find({"title": regexp} , null, req.option).exec();
    let promiseTopic = await Topic.find({"name": regexp} , null, req.option).exec();

    res.status(200).json({
        'challenges': promiseChallenge,
        'topics': promiseTopic
    });
    
})

module.exports = router;