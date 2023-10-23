const { raise } = require("../middlewares/errors")
const { User, Admin } = require("./models")
const { decode } = require("./crypto")
function parseToken(token){
    let decoded;
    try {
        decoded = decode(token);
    } catch (error) {
        return false;
    }
    return decoded;
}
const AuthMiddlewares = {
    user: async(req, res, next) => {
        if(!req.headers.token)
            return raise({status:400, message: 'No token'})
        const token = parseToken(req.headers.token)
        if(!token)
            return raise({status: 401, message: 'Invalid token'})
        const user = await User.findOne({where: {email: token.email}})
        if(!user)
            return raise({status: 401, message: 'User not found'})
        req.locals = token
        next()
    },
    admin: async(req, res, next) => {
        if(!req.headers.token)
            return raise({status:400, message: 'No token'})
        const token = parseToken(req.headers.token)
        if(!token)
            return raise({status: 401, message: 'Invalid token'})
        const admin = await Admin.findOne({where: {email: token.email}})
        if(!admin)
            return raise({status: 401, message: 'Admin not found'})
        req.locals = token
        next()
    }
}

module.exports = AuthMiddlewares