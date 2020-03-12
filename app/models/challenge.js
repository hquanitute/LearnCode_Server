const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    title:{
        type: String,
        default:null
    },
    challengeType:{
        type: Number,
        default:0
    },
    video:{
        type: String,
        default:null
    },
    forumTopicId:{
        type: Number,
        default:-1
    },
    tests:{
        type: String,
        default:null
    },
    beforeTest:{
        type: String,
        default:null
    },
    afterTest:{
        type: String,
        default:null
    },
    solutions:{
        type: String,
        default:null
    },
    description:{
        type: String,
        default:null
    },
    instructions:{
        type: String,
        default:null
    },
    contents:{
        type: String,
        default:null
    },
    block:{
        type: String,
        default:null
    },
    dashedName:{
        type: String,
        default:null
    },
    order: {
        type: Number,
        default:-1
    },
    superOrder: {
        type: Number,
        default:-1
    },
    superBlock: {
        type: String,
        default:null
    },
    challengeOrder: {
        type: Number,
        default:-1
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    isRequired:{
        type:Boolean,
        default:true
    },
    time:{
        type:Number,
        default:30
    }
});

challengeSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Challenge", challengeSchema);