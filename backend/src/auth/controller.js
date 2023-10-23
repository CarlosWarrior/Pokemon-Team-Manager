const { raise } = require("../middlewares/errors")
const { decode } = require('jsonwebtoken')
const { User } = require("./models")
const { tokenize, compareHash } = require("./crypto")

const AuthController = {
    google: async(req, res)=>{
        if(!req.body.credential || !req.body.select_by)
            return raise({status: 400})
        
        const gtoken = req.body.credential
        let decoded;
        try {
            decoded = decode(gtoken)
        } catch (error) {
            return raise({status: 400, message: "Invalid token", error })
        }
        
        let user = await User.findOne({ filter: {email: decoded.email} })
        if(!user){
            try {
                user = await User.create({
                    name: decoded.name,
                    email: decoded.email,
                    password: decoded.sub,
                })
            } catch (error) {
                return raise({status: 400, message: "Invalid payload", error})
            }
        }

        const token = tokenize(user.toJSON())
        res.send({token})
    },
    login: async(req, res)=>{
        if(!req.body.password || !req.body.email)
            return raise({status: 400})
        const email = req.body.email
        const password = req.body.password
        
        const user = await User.findOne({filter:{ email }})
        if(!user)
            return raise({status:401})
        
        const attempt = compareHash(password, user.password)
        if(!attempt)
            return raise({status:401})

        const token = tokenize(user.toJSON())
        res.send({token})
    },
    register: async(req, res)=>{
        if(!req.body.password || !req.body.email || !req.body.name)
            return raise({status: 400})
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        
        let user = await User.findOne({filter:{ email }})
        if(user)
            return raise({status:400})

        try {
           user = await User.create({ name, email, password })
        } catch (error) {
            return raise({status: 400, message: "Invalid body", error})
        }

        const token = tokenize(user.toJSON())
        res.send({token})
    },
    admin_register_token: async(req, res)=>{
        res.send('auth register token')
    },
    admin_register: async(req, res)=>{
        res.send('auth register')
    },
    password_reset_token: async(req, res)=>{
        res.send('auth password reset token')
    },
    password_reset: async(req, res)=>{
        res.send('auth password reset')
    },
}

module.exports = AuthController