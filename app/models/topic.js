const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Challenge = require('./challenge')

const TopicSchema = new Schema({
    name:{
        type: String
    },
    challengeId:{type: mongoose.Schema.Types.ObjectId, ref: Challenge},
    content:{
        type:Boolean,
        default:false
    },
    comments : [{type: String , default:[]}],
    tags : [{type: String , default:[]}],
    type : {type: String},
});

TopicSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Topic", TopicSchema);