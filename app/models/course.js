const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Lesson = require('./lesson');

const courseSchema = new Schema({
    name:{
        type: String
    },
    dashedName:{
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
    lessons: [{type: mongoose.Schema.Types.ObjectId, ref: Lesson}]
});

courseSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Course", courseSchema);