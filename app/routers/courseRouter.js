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
        course.order = Number(req.body.order);
    }
    if (req.body.isPublished) {
        if(req.body.isPublished=="true"){
            course.isPublished=true
        } else {
            course.isPublished=false
        }
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
    // Course.find({}, {}, req.option, (err, course) => {
    //     if (err) {
    //         return res.json({ "status": "error", "value": err });
    //     }
    //     res.json({ "content": course })
    // })
    Course.find({}, {}, req.option).populate({path:'lessons',populate:{path:'challenges', options: { sort: { 'challengeOrder': 1 }} }, options: { sort: { 'order': 1 } }}).exec(
        (err, course) => {
            if (err) {
                return res.json({ "status": "error", "value": err });
            }
            res.json({ "content": course })
        }
    )
}).get("/:courseId", (req, res) => {
    Course.findById(req.params.courseId).populate('lessons').exec(
        (err, course) => {
            if (err) {
                return res.json({ "status": "error", "value": err });
            }
            res.json({ "content": course })
        }
    )
    // Course.findById((req.params.courseId), (err, course) => {
    //     if (err) {
    //         return res.json({ "status": "error", "value": err });
    //     }
    //     res.json({ "content": course })
    // })
}).put("/:courseId", (req, res) => {
    Course.findById((req.params.courseId), (err, course) => {
        if (err) {
            return err;
        }
        if (req.body.name) {
            course.name = req.body.name;
        }
        if (req.body.dashName) {
            course.dashName = req.body.dashName;
        }
        if (req.body.order) {
            course.order = req.body.order;
        }
        if (req.body.isPublished) {
            console.log(req.body.isPublished)
            if(req.body.isPublished=="true"){
                course.isPublished=true
            } else {
                course.isPublished=false
            }
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
}).delete("/:courseId", (req, res) => {
    Course.deleteOne({ _id: req.params.courseId }, (err) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            status: "success",
            value: "Da xoa thanh cong course"
        })
    })
}).put("/:courseId/add", (req, res) => {
    Course.findById((req.params.courseId), (err, course) => {
        console.log("ghe put add")
        if (err) {
            return err;
        }
        if (req.body.lesson) {
            console.log("ghe put add: ", req.body.lesson)
            course.lessons.push(req.body.lesson);
        }
        course.save((err) => {
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
}).put("/:courseId/remove", (req, res) => {
    Course.findById((req.params.courseId), (err, course) => {
        if (err) {
            return err;
        }
        if (req.body.lesson) {
            if (course.lessons.includes(req.body.lesson)) {
                course.lessons.remove(req.body.lesson);
            } else {
                return res.json({
                    status: "error",
                    value: "Khong co lesson nay trong lessons"
                })
            }
        }
        course.save((err) => {
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