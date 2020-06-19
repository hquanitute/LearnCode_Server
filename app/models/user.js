const mongoose = require('mongoose');

const Challenge = require('./challenge')
const Lesson = require('./lesson')
const Course = require('./course')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String
    },
    avater:{
        type:String,
        default:"http://www.mydaymyplan.com/images/no-image-large.png"
    },
    googleId:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    status:{
        type: String,
        default:"UnActive"
    },
    role:{
        type: String,
        default:"user"
    },
    email:{
        type: String,
        default:"abc@gmail.com"
    },
    listCourseIdPassed: [{type: mongoose.Schema.Types.ObjectId, ref: Course, default:[]}],
    listLessonIdPassed: [{type: mongoose.Schema.Types.ObjectId, ref: Lesson, default:[]}],
    listChallengeIdPassed: [{type: mongoose.Schema.Types.ObjectId, ref: Challenge, default:[]}],
});

UserSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("User", UserSchema);