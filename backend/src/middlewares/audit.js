module.exports = (scope) => async(req, res, next) => {
    console.log(req.locals, scope)
    // await Audit.create({
    // })
    next()
}