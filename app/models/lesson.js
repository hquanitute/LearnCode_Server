const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Challenge = require('./challenge')

const LessonSchema = new Schema({
    name:{
        type: String
    },
    dashName:{
        type:String
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    order: {
        type: Number,
        default:-1
    },
    challenges: [{type: mongoose.Schema.Types.ObjectId, ref: Challenge},]
});

LessonSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Lesson", LessonSchema);