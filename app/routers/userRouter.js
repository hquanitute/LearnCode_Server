const express = require('express');
const User = require('../models/user');
var router = express.Router();
const option = require('./../middlewares/queryOption')

router.post("/", (req, res) => {
    let user = new User();
    if (req.body.name) {
        user.name = req.body.name;
    }
    if (req.body.avater) {
        user.avater = req.body.avater;
    }
    if (req.body.username) {
        user.username = req.body.username;
    }
    if (req.body.status) {
        user.status = req.body.status;
    }
    if (req.body.role) {
        user.role = req.body.role;
    }
    User.create(user).then((userCreated, err) => {
        if (err) {
            return res.json({
                status: "error",
                value: err
            });
        }
        return res.json({
            status: "success",
            value: "Them user thanh cong"
        });
    })
}).get("/", option(), (req, res) => {
    User.find({}, {}, req.option)
    .populate('listCourseIdPassed')
    .populate('listLessonIdPassed')
    .populate('listChallengeIdPassed')
    .exec(
        (err, user) => {
            if (err) {
                return res.json({ "status": "error", "value": err });
            }
            res.json({ "content": user })
        }
    )
}).get("/:userId", (req, res) => {
    User.findById((req.params.userId), (err, user) => {
        if (err) {
            return res.json({ "status": "error", "value": err });
        }
        res.json({ "content": user })
    })
}).put("/:userId", (req, res) => {
    User.findById((req.params.userId), (err, user) => {
        if (err) {
            return err;
        }
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.avater) {
            user.avater = req.body.avater;
        }
        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.status) {
            user.status = req.body.status;
        }
        if (req.body.role) {
            user.role = req.body.role;
        }
        if (req.body.listChallengeIdPassed) {
            user.listChallengeIdPassed = req.body.listChallengeIdPassed;
        }
        user.save((err,userUpdated) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                status: "success",
                value: userUpdated
            })
        });
    })
}).delete("/:userId",(req, res)=>{
    User.deleteOne({_id:req.params.userId},(err)=>{
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