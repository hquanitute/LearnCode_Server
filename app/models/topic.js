const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Challenge = require('./challenge')
const User = require('./user');
const CommentObject = require('./comment')

const TopicSchema = new Schema({
    name:{
        type: String
    },
    challengeId:{type: mongoose.Schema.Types.ObjectId, ref: Challenge},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: User},
    content:{
        type:String,
        default:''
    },
    tags : [{type: String , default:[]}],
    type : {type: String},
    commentsObject : [{type:  mongoose.Schema.Types.ObjectId, ref: CommentObject, default:[]}],
    timestamp : {type: Number, default: new Date().getTime()},
});

TopicSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Topic", TopicSchema);