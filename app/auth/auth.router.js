var jwt = require('jsonwebtoken');
const {passport} = require('./passport.config');

module.exports = (app) => {
    app.get('/auth/google', 
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {            
            let token = jwt.sign(JSON.parse(JSON.stringify(req.user)), process.env.CLIENT_SECRET, { expiresIn: 60 * 60 * 24 })
            res.redirect(process.env.REDIRECT_URL + token);
        });
}