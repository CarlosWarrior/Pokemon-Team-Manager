module.export = async(req,res,next) => {
    res.locals=null
    req.locals=null
    next()
}