const express = require('express');
const Lesson = require('./../models/lesson')
var router = express.Router();
const option = require('./../middlewares/queryOption')

router.post("/", (req, res) => {
    let lesson = new Lesson();
    if (req.body.name) {
        lesson.name = req.body.name;
    }
    if (req.body.dashedName) {
        lesson.dashedName = req.body.dashedName;
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
    Lesson.find({}, {}, req.option, (err, lesson) => {
        if (err) {
            return res.json({ "status": "error", "value": err });
        }
        res.json({ "content": lesson })
    })
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
        if (req.body.dashedName) {
            lesson.dashedName = req.body.dashedName;
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
})

module.exports = router;