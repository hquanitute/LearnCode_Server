var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const User = require('../models/user')

passport.serializeUser((user,done)=>{
    done(null, user.id);
})
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    })
})
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id }).then((user) => {
            if (user != null) {
                cb(null, user);
            } else {
                let newUser = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    username: profile.emails[0].value,
                    name: profile.displayName,
                    avater: profile.photos[0].value
                })
                newUser.save().then(user => cb(null, user));
            }
        });

    }
));

module.exports.passport =passport;