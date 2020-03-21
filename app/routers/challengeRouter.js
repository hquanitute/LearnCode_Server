const express = require('express');
const Challenge = require('./../models/challenge')
var router = express.Router();
const option = require('./../middlewares/queryOption')

router.post("/", (req, res) => {
    let challenge = new Challenge();
    if (req.body.title) {
        challenge.title = req.body.title;
    }
    if (req.body.challengeType) {
        challenge.challengeType = req.body.challengeType;
    }
    if (req.body.video) {
        challenge.video = req.body.video;
    }
    if (req.body.forumTopicId) {
        challenge.forumTopicId = req.body.forumTopicId;
    }
    if (req.body.tests) {
        challenge.tests = req.body.tests;
    }
    if (req.body.beforeTest) {
        challenge.beforeTest = req.body.beforeTest;
    }
    if (req.body.afterTest) {
        challenge.afterTest = req.body.afterTest;
    }
    if (req.body.solutions) {
        challenge.solutions = req.body.solutions;
    }
    if (req.body.description) {
        challenge.description = req.body.description;
    }
    if (req.body.instructions) {
        challenge.instructions = req.body.instructions;
    }
    if (req.body.contents) {
        challenge.contents = req.body.contents;
    }
    if (req.body.block) {
        challenge.block = req.body.block;
    }
    if (req.body.dashedName) {
        challenge.dashedName = req.body.dashedName;
    }
    if (req.body.order) {
        challenge.order = req.body.order;
    }
    if (req.body.superOrder) {
        challenge.superOrder = req.body.superOrder;
    }
    if (req.body.superBlock) {
        challenge.superBlock = req.body.superBlock;
    }
    if (req.body.challengeOrder) {
        challenge.challengeOrder = req.body.challengeOrder;
    }
    if (req.body.isPublished) {
        challenge.isPublished = req.body.isPublished;
    }
    if (req.body.isRequired) {
        challenge.isRequired = req.body.isRequired;
    }
    if (req.body.time) {
        challenge.time = req.body.time;
    }
    Challenge.create(challenge).then((challengeCreated, err) => {
        if (err) {
            return res.json({
                status: "error",
                value: err
            });
        }
        return res.json({
            status: "success",
            value: "Them challenge thanh cong"
        });
    })
}).get("/", option(), (req, res) => {
    Challenge.find({}, {}, req.option, (err, challenge) => {
        if (err) {
            return res.json({ "status": "error", "value": err });
        }
        res.json({ "content": challenge })
    })
}).get("/:challengeId", (req, res) => {
    Challenge.findById((req.params.challengeId), (err, challenge) => {
        if (err) {
            return res.json({ "status": "error", "value": err });
        }
        res.json({ "content": challenge })
    })
}).put("/:challengeId", (req, res) => {
    Challenge.findById((req.params.challengeId), (err, challenge) => {
        if (err) {
            return err;
        }
        if (req.body.title) {
            challenge.title = req.body.title;
        }
        if (req.body.challengeType) {
            challenge.challengeType = req.body.challengeType;
        }
        if (req.body.video) {
            challenge.video = req.body.video;
        }
        if (req.body.forumTopicId) {
            challenge.forumTopicId = req.body.forumTopicId;
        }
        if (req.body.tests) {
            challenge.tests = req.body.tests;
        }
        if (req.body.beforeTest) {
            challenge.beforeTest = req.body.beforeTest;
        }
        if (req.body.afterTest) {
            challenge.afterTest = req.body.afterTest;
        }
        if (req.body.solutions) {
            challenge.solutions = req.body.solutions;
        }
        if (req.body.description) {
            challenge.description = req.body.description;
        }
        if (req.body.instructions) {
            challenge.instructions = req.body.instructions;
        }
        if (req.body.contents) {
            challenge.contents = req.body.contents;
        }
        if (req.body.block) {
            challenge.block = req.body.block;
        }
        if (req.body.dashedName) {
            challenge.dashedName = req.body.dashedName;
        }
        if (req.body.order) {
            challenge.order = req.body.order;
        }
        if (req.body.superOrder) {
            challenge.superOrder = req.body.superOrder;
        }
        if (req.body.superBlock) {
            challenge.superBlock = req.body.superBlock;
        }
        if (req.body.challengeOrder) {
            challenge.challengeOrder = req.body.challengeOrder;
        }
        if (req.body.isPublished) {
            challenge.isPublished = req.body.isPublished;
        }
        if (req.body.isRequired) {
            challenge.isRequired = req.body.isRequired;
        }
        if (req.body.time) {
            challenge.time = req.body.time;
        }
        challenge.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                status: "success",
                value: "Da cap nhap challenge"
            })
        });
    })
}).delete("/:challengeId", (req, res) => {
    Challenge.deleteOne({ _id: req.params.challengeId }, (err) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            status: "success",
            value: "Da xoa thanh cong challenge"
        })
    })
})

module.exports = router;