const express = require('express');
const Challenge = require('./../models/challenge')
var router = express.Router();
const option = require('./../middlewares/queryOption')

router.post("/", (req, res) => {
    let challenge = new Challenge();
    challenge.title = req.body.title;
    Challenge.create(challenge).then((challengeCreated,err)=>{
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }
        return res.json({
            success: true,
            message: "Them challenge thanh cong"
        });
    })
}).get("/", option() , (req, res) => {
    Challenge.find({},{},req.option, (err,challenge) => {
        if(err){
            return res.json({"status":"error", "value":err});
        }
        res.json({"content":challenge})
    })
})

module.exports = router;