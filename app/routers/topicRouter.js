const express = require('express');
const Topic = require('../models/topic')
var router = express.Router();
const option = require('./../middlewares/queryOption')

router.post("/", (req, res) => {
    let topic = new Topic();
    if (req.body.name) {
        topic.name = req.body.name;
    }
    if (req.body.challengeId) {
        topic.challengeId = req.body.challengeId;
    }
    if (req.body.content) {
        topic.content = req.body.content;
    }
    if (req.body.tags) {
        topic.tags = req.body.tags;
    }
    if (req.body.type) {
        topic.type = req.body.type;
    }
    if (req.body.userId) {
        topic.userId = req.body.userId;
    }
    Topic.create(topic).then((topicCreated) => {
        res.json({
            status: "success",
            value: topicCreated
        });
    }).catch( err => res.status(400).send(new Error('Create topic failed!')));
}).get("/", option(), async(req, res) => {
    let listTags = [];
   
    if (req.query.tags == undefined || req.query.tags == "") {
        const numTopic = await Topic.countDocuments().exec();
        let max_page = numTopic / req.query.limit + 1;
        if (Math.floor(numTopic / req.query.limit) === numTopic / req.query.limit) {
            max_page = numTopic / req.query.limit;
        } else {
            max_page = Math.floor( max_page)
        }
        const pagination = {
            "current_page": Math.floor(req.query.skip/req.query.limit+1),
            "max_page": max_page,
            "total": numTopic
        }
        Topic.find({}, {}, req.option)
            .populate({path:'userId', select:'name avater'})
            .exec(
                (err, topics) => {
                    if (err) {
                        return res.status(404).json({ "status": "error", "value": err });
                    }
                    res.json({ "content": topics, "pagination": pagination })
                }
            )
    } else {
        listTags = req.query.tags.split('~') || [];
        const numTopic = await Topic.countDocuments({ tags: listTags[0] }, null).exec();
        let max_page = numTopic / req.query.limit + 1;
        if (Math.floor(numTopic / req.query.limit) === numTopic / req.query.limit) {
            max_page = numTopic / req.query.limit;
        } else {
            max_page = Math.floor( max_page)
        }
        const pagination = {
            "current_page": Math.floor(req.query.skip/req.query.limit+1),
            "max_page": max_page,
            "total": numTopic
        }
        Topic.find({ tags: listTags[0] }, {}, req.option)
            .populate({path:'userId', select:'name avater'})
            .exec(
                (err, topics) => {
                    if (err) {
                        return res.json({ "status": "error", "value": err });
                    }
                    res.json({ "content": topics, "pagination": pagination });
                }
            )
    }
}).get("/:topicId", (req, res) => {
    Topic.findById((req.params.topicId), {}, {}).
        populate('userId').
        populate(
            {
                path: 'commentsObject',
                populate: { path:"userId" }
            }
        )
        .exec((err, topic) => {
            if (err) {
                return res.status(404).json({ "status": "error", "value": err });
            }
            topic.commentsObject.sort((a,b) => b.likePeople.length - a.likePeople.length)        
            res.json({ "content": topic })
        })
}).get("/commentsOnly/:topicId", (req, res) => {
    Topic.findById((req.params.topicId), 'userId commentsObject', {}).
        populate('userId').
        populate(
            {
                path: 'commentsObject',
                populate: { path:"userId" }
            }
        )
        .exec((err, topic) => {
            if (err) {
                return res.status(404).json({ "status": "error", "value": err });
            }
            topic.commentsObject.sort((a,b) => b.likePeople.length - a.likePeople.length)
            res.json({ "content": topic })
        })
}).put("/:topicId", (req, res) => {
    Topic.findById((req.params.topicId)).populate('userId').exec( (err, topic) => {
        if (err) {
            return err;
        }
        if (req.body.name) {
            topic.name = req.body.name;
        }
        if (req.body.challengeId) {
            topic.challengeId = req.body.challengeId;
        }
        if (req.body.content) {
            topic.content = req.body.content;
        }
        if (req.body.tags) {
            topic.tags = req.body.tags;
        }
        if (req.body.type) {
            topic.type = req.body.type;
        }
        topic.save((err, topicUpdated) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.json({
                status: "success",
                value: topicUpdated
            })
        });
    })
}).delete("/:topicId", (req, res) => {
    Topic.deleteOne({ _id: req.params.topicId }, (err) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            status: "success",
            value: "Da xoa thanh cong lesson"
        })
    })
})

module.exports = router;