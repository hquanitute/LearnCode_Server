module.exports = () => {
    return (req, res, next) => {
        let option={};
        if(req.query.limit){
            option.limit=Number(req.query.limit);
        }
        if(req.query.skip){
            option.skip=Number(req.query.skip)
        }
        if(req.query.sort){

            option.sort= req.query.sort
        }
        req.option=option;
        next();
    }
}