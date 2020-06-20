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
        topic.username = req.body.username;
    }
    if (req.body.comments) {
        topic.comments = req.body.comments;
    }
    if (req.body.tags) {
        topic.tags = req.body.tags;
    }
    if (req.body.type) {
        topic.type = req.body.type;
    }
    Topic.create(topic).then((topicCreated, err) => {
        if (err) {
            return res.json({
                status: "error",
                value: err
            });
        }
        return res.json({
            status: "success",
            value: topicCreated
        });
    })
}).get("/", option(), (req, res) => {
    Topic.find({}, {}, req.option)
    .exec(
        (err, topics) => {
            if (err) {
                return res.json({ "status": "error", "value": err });
            }
            res.json({ "content": topics })
        }
    )
}).get("/:topicId", (req, res) => {
    Topic.findById((req.params.topicId), (err, topic) => {
        if (err) {
            return res.json({ "status": "error", "value": err });
        }
        res.json({ "content": topic })
    })
}).put("/:topicId", (req, res) => {
    Topic.findById((req.params.topicId), (err, topic) => {
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
            topic.username = req.body.username;
        }
        if (req.body.comments) {
            topic.comments = req.body.comments;
        }
        if (req.body.tags) {
            topic.tags = req.body.tags;
        }
        if (req.body.type) {
            topic.type = req.body.type;
        }
        topic.save((err,topicUpdated) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                status: "success",
                value: topicUpdated
            })
        });
    })
}).delete("/:topicId",(req, res)=>{
    User.deleteOne({_id:req.params.topicId},(err)=>{
        if(err){
            return res.send(err);
          }
          res.json({
            status:"success",
            value:"Da xoa thanh cong lesson"
          })
    })
})

module.exports = router;