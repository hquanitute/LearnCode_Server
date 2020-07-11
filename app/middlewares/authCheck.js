module.exports.authCheck = (req,res,next) => {
    if(process.env.mode =='DEV'){
        next();
        //if not use if else if =>>>> after next() must have return
    }
    else if(req.user){
        next();
    } else {
        // res.redirect('/');
        res.status(403).send("Login failed")
    }
};