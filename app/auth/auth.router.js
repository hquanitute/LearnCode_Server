const {passport} = require('./passport.config');

module.exports = (app) => {
    app.get('/auth/google', 
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/login');
        });
}