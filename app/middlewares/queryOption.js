module.exports = () => {
    return (req, res, next) => {
        let option={};
        if(req.query.limit){
            option.limit=Number(req.query.limit);
        }
        if(req.query.skip){
            option.skip=Number(req.query.skip)
        }
        req.option=option;
        next();
    }
}