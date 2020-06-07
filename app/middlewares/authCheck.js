module.exports.authCheck = (req,res,next) => {
    if(process.env.mode =='DEV'){
        next();
    }
    if(req.user){
        next();
    } else {
        res.redirect('/');
    }
};