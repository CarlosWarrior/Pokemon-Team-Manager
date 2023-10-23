const { raise } = require("../middlewares/errors")
const { User, Admin } = require("./models")
const { decode } = require("./crypto")

function isExpired  (timeString) {
	const now = new Date()
	const then = new Date(timeString)
	const elapsed = Math.abs(now - then) / 36e5
	return isNaN(elapsed) || elapsed >= 10
}

function parseToken(token){
    let decoded;
    try {
        decoded = decode(token);
    } catch (error) {
        return false;
    }
    return decoded;
}

function validatetoken(req){
    const token = req.headers.token
    if(!token)
        return raise({status: 400, message: "Token not provided"})
    const decoded = parseToken(token)
    if(!decoded)
        return raise({status: 400, message: "Invalid token"})
    if(isExpired(decoded.date))
        return raise({status: 400, message: "Token expired"})
    return decoded
}

const AuthMiddlewares = {
    user: async(req, res, next) => {
        try {
            const token = validatetoken(req)  
        } catch (error) {
            return raise(error)
        }
        const user = await User.findOne({where: {email: token.email}})
        if(!user)
            return raise({status: 401, message: 'User not found'})
        req.locals = token
        next()
    },
    admin: async(req, res, next) => {
        try {
            const token = validatetoken(req)
        } catch (error) {
            return raise(error)
        }
        const admin = await Admin.findOne({where: {email: token.email}})
        if(!admin)
            return raise({status: 401, message: 'Admin not found'})
        req.locals = token
        next()
    }
}

module.exports = AuthMiddlewares