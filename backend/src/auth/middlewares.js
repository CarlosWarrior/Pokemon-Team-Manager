const { raise } = require("../middlewares/errors")
const { User, Admin } = require("./models")
function parseToken(token){
    return token;
}
const AuthMiddlewares = {
    user: async(req, res, next) => {
        if(!req.headers.token)
            return raise({status:400})
        const token = parseToken(req.headers.token)
        if(!token)
            return raise({status: 401})
        req.locals = {
            token,
            user: 'user'
        }
        next()
    },
    admin: async(req, res, next) => {
        if(!req.headers.token)
            return raise({status:400})
        const token = parseToken(req.headers.token)
        if(!token)
            return raise({status: 401})
        req.locals = {
            token,
            admin: 'admin'
        }
        next()
    }
}

module.exports = AuthMiddlewares