module.exports.authCheck = (req,res,next) => {
    if(req.user){
        next();
    } else {
        res.redirect('/');
    }
};