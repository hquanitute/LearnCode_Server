var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const User = require('../models/user')

module.exports.passport = passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id }).then((err,user) => {
            if (err){
                return cb(err);
            }
            if (user != null) {
                console.log("User da ton tai");
                cb(null, user);
            } else {
                console.log("Tao moi user");
                console.log(profile);
                
                new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    username: profile.emails[0].value,
                    name: profile.displayName
                }).save().then(user => cb(null, user))
            }
        });

    }
));