const express = require('express');
const Lesson = require('./../models/lesson')
var router = express.Router();
const option = require('./../middlewares/queryOption')

router.post("/", (req, res) => {
    let lesson = new Lesson();
    if (req.body.name) {
        lesson.name = req.body.name;
    }
    if (req.body.dashName) {
        lesson.dashName = req.body.dashName;
    }
    if (req.body.order) {
        lesson.order = req.body.order;
    }
    if (req.body.isPublished) {
        lesson.isPublished = req.body.isPublished;
    }
    Lesson.create(lesson).then((lessonCreated, err) => {
        if (err) {
            return res.json({
                status: "error",
                value: err
            });
        }
        return res.json({
            status: "success",
            value: "Them lesson thanh cong"
        });
    })
}).get("/", option(), (req, res) => {
    Lesson.find({}, {}, req.option).populate('challenges').exec(
        (err, lesson) => {
            if (err) {
                return res.json({ "status": "error", "value": err });
            }
            res.json({ "content": lesson })
        }
    )
}).get("/:lessonId", (req, res) => {
    Lesson.findById((req.params.lessonId), (err, lesson) => {
        if (err) {
            return res.json({ "status": "error", "value": err });
        }
        res.json({ "content": lesson })
    })
}).put("/:lessonId", (req, res) => {
    Lesson.findById((req.params.lessonId), (err, lesson) => {
        if (err) {
            return err;
        }
        if (req.body.name) {
            lesson.name = req.body.name;
        }
        if (req.body.dashName) {
            lesson.dashName = req.body.dashName;
        }
        if (req.body.order) {
            lesson.order = req.body.order;
        }
        if (req.body.isPublished) {
            lesson.isPublished = req.body.isPublished;
        }
        lesson.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                status: "success",
                value: "Da cap nhap lesson"
            })
        });
    })
}).delete("/:lessonId",(req, res)=>{
    Lesson.deleteOne({_id:req.params.lessonId},(err)=>{
        if(err){
            return res.send(err);
          }
          res.json({
            status:"success",
            value:"Da xoa thanh cong lesson"
          })
    })
}).put("/:lessonId/add", (req, res) => {
    Lesson.findById((req.params.lessonId), (err, lesson) => {
        console.log("ghe put add lesson")
        if (err) {
            return err;
        }
        if (req.body.challenge) {
            lesson.challenges.push(req.body.challenge);
        }
        lesson.save((err) => {
            if (err) {
                return res.send(err);
            }
            // res.json({
            //     status: "success",
            //     value: "Da cap nhap course them lesson"
            // })
            res.send("fine")
        });
    })
}).put("/:lessonId/remove", (req, res) => {
    Lesson.findById((req.params.lessonId), (err, lesson) => {
        if (err) {
            return err;
        }
        if (req.body.challenge) {
            if (lesson.challenges.includes(req.body.challenge)) {
                lesson.challenges.remove(req.body.challenge);
            } else {
                return res.json({
                    status: "error",
                    value: "Khong co challenge nay trong lessons"
                })
            }
        }
        lesson.save((err) => {
            if (err) {
                return res.send(err);
            }
            // res.json({
            //     status: "success",
            //     value: "Da cap nhap course xoa 1 lesson"
            // })
            res.send("fine")
        });
    })
})

module.exports = router;