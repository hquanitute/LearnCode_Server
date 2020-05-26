const mongoose = require('mongoose');
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
});

UserSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("User", UserSchema);