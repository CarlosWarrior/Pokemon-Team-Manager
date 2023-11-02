const { raise } = require("../middlewares/errors")
const { User, Admin } = require("./models")
const { decode } = require("./crypto")

const {isExpired} = require('../utils/dates')

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
    if(!decoded.email || !decoded.date)
        return raise({ status: 400, message: "Malformed token" })
    if(isExpired(decoded.date))
        return raise({status: 400, message: "Token expired"})
    return decoded
}

const AuthMiddlewares = {
    load: async(req) =>{
        let session
        try {
            session = validatetoken(req)  
        } catch (error) {
            return raise(error)
        }
        let user = null
        switch (session.role) {
            case 'user':
                user = await User.findById(session._id)
            break;
            case 'admin':
                user = await Admin.findById(session._id)
            break;
        }
        if(user){
            user = user.toJSON()
            user['role'] = session.role
        }
        return user
    },
    user: async(req, res, next) => {
        let token
        try {
            token = validatetoken(req)  
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
        let token
        try {
            token = validatetoken(req)
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