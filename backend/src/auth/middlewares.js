const { raise } = require("../middlewares/errors")
const { User, Admin } = require("./models")
const AuthMiddlewares = {
    user: async(req, res, next) => {
        req.headers.token
        req.locals = {
            user: 'user'
        }
        next()
    },
    admin: async(req, res, next) => {
        req.headers.token
        req.locals = {
            admin: 'admin'
        }
        next()
    }
}

module.exports = AuthMiddlewares