const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Topic = require('./topic');

const CommentObject = new Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: User},
    content:{
        type:String,
        default:''
    },
    likePeople:[{type: mongoose.Schema.Types.ObjectId, ref: User}],
    timestamp : {type: Number, default: new Date().getTime()},
});

CommentObject.pre('deleteOne', function(next){
    // let promised = Topic.find({commentsObject : this._id}).exec();
    // promised.then(topic => {
    //     console.log(topic);
        
    //     topic.comments.remove(this._id);
    //     topic.save();
    // })
    return next();
});

module.exports = mongoose.model("CommentObject", CommentObject);