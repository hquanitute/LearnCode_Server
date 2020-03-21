const express = require('express');
const Course = require('./../models/course')
var router = express.Router();
const option = require('./../middlewares/queryOption')

router.post("/", (req, res) => {
    let course = new Course();
    if (req.body.name) {
        course.name = req.body.name;
    }
    if (req.body.dashedName) {
        course.dashedName = req.body.dashedName;
    }
    if (req.body.order) {
        course.order = req.body.order;
    }
    if (req.body.isPublished) {
        course.isPublished = req.body.isPublished;
    }
    Course.create(course).then((courseCreated, err) => {
        if (err) {
            return res.json({
                status: "error",
                value: err
            });
        }
        return res.json({
            status: "success",
            value: "Them course thanh cong"
        });
    })
}).get("/", option(), (req, res) => {
    Course.find({}, {}, req.option, (err, course) => {
        if (err) {
            return res.json({ "status": "error", "value": err });
        }
        res.json({ "content": course })
    })
}).get("/:courseId", (req, res) => {
    Course.findById((req.params.courseId), (err, course) => {
        if (err) {
            return res.json({ "status": "error", "value": err });
        }
        res.json({ "content": course })
    })
}).put("/:courseId", (req, res) => {
    Course.findById((req.params.courseId), (err, course) => {
        if (err) {
            return err;
        }
        if (req.body.name) {
            course.name = req.body.name;
        }
        if (req.body.dashedName) {
            course.dashedName = req.body.dashedName;
        }
        if (req.body.order) {
            course.order = req.body.order;
        }
        if (req.body.isPublished) {
            course.isPublished = req.body.isPublished;
        }
        course.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                status: "success",
                value: "Da cap nhap course"
            })
        });
    })
}).delete("/:courseId",(req, res)=>{
    Course.deleteOne({_id:req.params.courseId},(err)=>{
        if(err){
            return res.send(err);
          }
          res.json({
            status:"success",
            value:"Da xoa thanh cong course"
          })
    })
})

module.exports = router;