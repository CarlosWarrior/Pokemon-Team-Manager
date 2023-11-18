module.exports = (scope) => async(req, res, next) => {
    console.log(scope, req.locals || "guest")
    // await Audit.create({
    // })
    next()
}