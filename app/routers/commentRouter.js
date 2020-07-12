const express = require('express');
const Topic = require('../models/topic')
const CommentObject = require('../models/comment')

var router = express.Router();

router.get("/", (req, res) => {
    CommentObject.find().then((comment) => {
        res.status(200).json(comment.sort((a,b) => b.likePeople.length - a.likePeople.length));
    })
}).post("/", (req, res) => {
    let comment = new CommentObject();
    if (req.body.userId) {
        comment.userId = req.body.userId;
    }
    if (req.body.content) {
        comment.content = req.body.content;
    }
    CommentObject.create(comment).then((commentCreated) => {        
        Topic.findById(req.body.topicId).populate('userId').then((topic) => {
            topic.commentsObject.push(commentCreated._id);
            
            let promiseSave = topic.save();
            promiseSave.then(topicUpdated => {
                let topicUpdatedPopulatedPromised = topicUpdated.populate({ path: 'commentsObject' }).execPopulate();
                topicUpdatedPopulatedPromised.then((topicUpdatedPopulated) => {
                    console.log(topicUpdatedPopulated);
                    
                    topicUpdatedPopulated.commentsObject.sort((a,b) => b.likePeople.length - a.likePeople.length)
                    res.status(200).json({
                        status: "success",
                        value: topicUpdatedPopulated
                    });
                }).catch((err) => {
                    res.status(404).json({
                        status: "error",
                        message: err
                    });
                })
            })
        })
    }).catch(err => res.status(400).send(new Error('Create comment failed!')));
}).put("/:commentId", (req, res) => {
    CommentObject.findById((req.params.commentId)).populate('userId').exec((err, comment) => {
        if (err) {
            return err;
        }
        if(!comment){
            return res.status(400).send("Not found comment");
        }
        if (req.body.likePeople) {
            comment.likePeople = req.body.likePeople;
        }
        if (req.body.content) {
            comment.content = req.body.content;
        }
        comment.save((err, commentUpdated) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.json({
                status: "success",
                value: commentUpdated
            })
        });
    })
}).delete("/:commentId", (req, res) => {
    CommentObject.deleteOne({ _id: req.params.commentId }, (err) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        let promised = Topic.findOne
        ({ commentsObject: req.params.commentId }).exec();
        promised.then(topic => {
            topic.commentsObject.splice(topic.commentsObject.indexOf(req.params.commentId),1);
            let saveEnvet = topic.save();
            saveEnvet.then(() =>{
                res.json({
                    status: "success",
                    value: "Da xoa thanh cong lesson"
                })
            })
        })
    })
})

module.exports = router;